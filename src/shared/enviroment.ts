import { z } from 'zod';

export enum EEnvironment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TESTING = 'test',
}

const envSchema = z.object({
  NODE_ENV: z.enum([EEnvironment.DEVELOPMENT, EEnvironment.PRODUCTION, EEnvironment.TESTING]),
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string()
});

export const envConfig = envSchema.parse(process.env);

interface IGeneralEnv {
  environment: EEnvironment;
  name: string;
  port: number;
}

export const generalEnv: IGeneralEnv = {
  environment: envConfig.NODE_ENV,
  name: 'ayokas',
  port: envConfig.PORT,
};

interface IDatabaseEnv {
  url: string;
}

export const databaseEnv: IDatabaseEnv = {
  url: envConfig.DATABASE_URL,
};
