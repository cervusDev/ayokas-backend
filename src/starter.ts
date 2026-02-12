import 'dotenv/config';
import { Bootstrap } from './infra/bootstrap';
import { FastifyServer } from '@infra/server/FastifyServer';
import { FastifyErrorHandler } from '@infra/error/FastifyErrorHandler';

interface IMain {
  execute(): Promise<void>;
}

class Main implements IMain {
  public async execute(): Promise<void> {
    const errorHandler = new FastifyErrorHandler();
    const server = new FastifyServer(errorHandler);
    const boostrap = new Bootstrap(server);
    await boostrap.start();
  }
}

const main = new Main();
main.execute();
