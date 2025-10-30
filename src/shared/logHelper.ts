import winston, { type Logger } from 'winston';
import { EEnvironment, generalEnv } from './enviroment';

function createLogger(): Logger {
  return winston.createLogger({
    level: 'info',
    format:
      generalEnv.environment === EEnvironment.DEVELOPMENT
        ? winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
            winston.format.printf(({ level, message, timestamp }) => {
              return `[${timestamp}] ${level}: ${message}`;
            }),
          )
        : winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
    transports: [new winston.transports.Console()],
  });
}

export class LoggerHelper {
  public static error(message: string | Record<string, any>): void {
    const logger = createLogger();
    logger.error(message);
  }

  public static info(message: string): void {
    const logger = createLogger();
    logger.info(message);
  }
}
