import cors from '@fastify/cors';
import { HostNotAllowedError } from '@infra/error/HostNotAllowedError';
import corsConfig from 'config/cors';
import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteShorthandMethod,
  RouteShorthandOptions,
} from 'fastify';
import { EEnvironment, generalEnv } from 'shared/enviroment';
import rateLimit from '@fastify/rate-limit';
import { RateLimitError } from '@infra/error/RateLimitError';
import { routes } from '@infra/routes';
import { FastifyRouter } from '@infra/routes/FastifyRouter';
import { FastifyMiddleware } from './FastifyMiddleware';
import qs from 'qs';
import { IErrorHandler } from '@infra/interfaces/IErrorHandler';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export interface IStartInputData {
  port: number;
}

export interface IServerAdapter {
  registerMiddlewares(): Promise<void>;
  registerRoutes(): Promise<void>;
  start(inputData: IStartInputData): Promise<void>;
}

export class FastifyServer implements IServerAdapter {
  private readonly fastify: FastifyInstance;

  constructor(errorHandler: IErrorHandler) {
    this.fastify = Fastify({
      routerOptions: {
        querystringParser: (value) => qs.parse(value),
      },
    });

    this.fastify.setValidatorCompiler(validatorCompiler);
    this.fastify.setSerializerCompiler(serializerCompiler);
    this.fastify.withTypeProvider<ZodTypeProvider>();

    this.fastify.setErrorHandler(async (err, request, reply) => {
      await errorHandler.execute(err, { request, reply });
    });
  }

  public async registerMiddlewares(): Promise<void> {
    await this.fastify.register(cors, {
      origin: (origin, callback) => {
        if (generalEnv.environment === EEnvironment.DEVELOPMENT) {
          callback(null, true);
          return;
        }

        if (!origin) {
          callback(new HostNotAllowedError(), false);
          return;
        }

        const hostname = new URL(origin).hostname;
        console.log('hostname', hostname)

        if (corsConfig.allowedHosts.includes(hostname)) {
          callback(null, true);
          return;
        }

        callback(new HostNotAllowedError(), false);
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-type', 'Authorization'],
    });

    await this.fastify.register(rateLimit, {
      max: 60,
      timeWindow: '1 minute',
      ban: 5,
      errorResponseBuilder: () => {
        throw new RateLimitError();
      },
    });
  }

  public async registerRoutes(): Promise<void> {
    for (const route of routes) {
      const router = new FastifyRouter(route.controller);

      const middlewares = route.middlewares?.map((midddleware) => {
        const adapter = new FastifyMiddleware(midddleware);
        return adapter.execute.bind(adapter);
      });

      const routeOptions: any = {
        preHandler: middlewares,
      };

      if (route.schemas) {
        routeOptions.schema = route.schemas;
      }

      const methodMap = {
        PUT: this.fastify.put.bind(this.fastify),
        GET: this.fastify.get.bind(this.fastify),
        POST: this.fastify.post.bind(this.fastify),
        PATCH: this.fastify.patch.bind(this.fastify),
        DELETE: this.fastify.delete.bind(this.fastify),
      };

      const handler = methodMap[route.method];

      if (!handler) {
        throw new Error(`Método HTTP não suportado: ${route.method}`);
      }

      handler(route.path, routeOptions, async (request: FastifyRequest, reply: FastifyReply) => {
        await router.execute(request, reply);
      });
    }
  }

  public async start(inputData: IStartInputData): Promise<void> {
    await this.fastify.listen({ port: inputData.port, host: '0.0.0.0' });
  }
}
