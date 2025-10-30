import { IController } from '@infra/interfaces/IController';
import { type FastifyReply, type FastifyRequest } from 'fastify';
import { IRouterAdapter } from './IRouterAdapter';


export class FastifyRouter
  implements IRouterAdapter<FastifyRequest, FastifyReply>
{
  private readonly controller: IController;

  constructor(controller: IController) {
    this.controller = controller;
  }

  public async execute(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const result = await this.controller.execute({
      body: request.body,
      metadata: request.metadata,
      params: request.params as Record<string, string>,
      query: request.query as Record<string, string>,
    });
    return reply.code(result.statusCode).send(result.body || undefined);
  }
}
