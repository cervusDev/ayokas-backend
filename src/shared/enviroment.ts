import { z } from 'zod';

export enum EEnvironment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TESTING = 'test',
}

const envSchema = z.object({
  NODE_ENV: z.enum([EEnvironment.DEVELOPMENT, EEnvironment.PRODUCTION, EEnvironment.TESTING]),
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASS: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string(),
  DATABASE_NAME: z.string(),
});

export const envConfig = envSchema.parse(process.env);

interface IGeneralEnv {
  environment: EEnvironment;
  name: string;
  port: number;
}

export const generalEnv: IGeneralEnv = {
  environment: envConfig.NODE_ENV,
  name: 'serene.cervusdev.com.br',
  port: envConfig.PORT,
};

interface IDatabaseEnv {
  userDatabase: string;
  passDatabase: string;
  hostDatabase: string;
  portDatabase: string;
  nameDatabase: string;
}

export const databaseEnv: IDatabaseEnv = {
  nameDatabase: envConfig.DATABASE_NAME,
  hostDatabase: envConfig.DATABASE_HOST,
  passDatabase: envConfig.DATABASE_PASS,
  portDatabase: envConfig.DATABASE_PORT,
  userDatabase: envConfig.DATABASE_USER,
};

interface IJwtEnv {
  secretBackoffice: string;
}

export const jwtEnv: IJwtEnv = {
  secretBackoffice: envConfig.JWT_SECRET,
};
