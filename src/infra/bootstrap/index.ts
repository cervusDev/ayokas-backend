import { IBootstrap } from './IBoosttrap';
import { LoggerHelper } from 'shared/logHelper';
import { IServerAdapter } from '@infra/server/FastifyServer';
import { envConfig, generalEnv } from 'shared/enviroment';
import { sql } from 'drizzle-orm';
import { drizzleDatabase } from '@infra/database';


export class Bootstrap implements IBootstrap {
  private readonly server: IServerAdapter;

  constructor(server: IServerAdapter) {
    this.server = server;
  }

  public async start(): Promise<void> {
    try {
      await this.startDatabase();
      await this.startMiddlewares();
      await this.startRoutes();
      await this.startServer();
    } catch (err) {
      this.handleBootstrapError(err);
    }
  }

  private async startDatabase(): Promise<void> {
    await drizzleDatabase.getInstance().execute(sql`SELECT 1`);
    LoggerHelper.info('✅ Banco de dados conectado');
  }

  private async startMiddlewares(): Promise<void> {
    await this.server.registerMiddlewares();
    LoggerHelper.info('✅ Middlewares registrados');
  }

  private async startRoutes(): Promise<void> {
    await this.server.registerRoutes();
    LoggerHelper.info('✅ Rotas registradas');
  }

  private async startServer(): Promise<void> {
    await this.server.start({ port: envConfig.PORT });
    this.logServerStarted();
  }

  private logServerStarted(): void {
    LoggerHelper.info(
      `✅ ${generalEnv.name} iniciado na porta ${generalEnv.port}`,
    );
  }

  private handleBootstrapError(err: unknown): void {
    if (err instanceof Error) {
      LoggerHelper.error({
        message: `❌ Erro ao iniciar ${generalEnv.name}`,
        stack: err.stack,
        name: err.name,
      });
    } else {
      LoggerHelper.error(`❌ Erro desconhecido: ${JSON.stringify(err)}`);
    }
    process.exit(1);
  }
}
