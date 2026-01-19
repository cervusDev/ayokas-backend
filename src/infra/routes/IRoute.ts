import { ZodObject } from 'zod';
import { IController } from '@infra/interfaces/IController';
import { IMiddleware } from '@infra/interfaces/IMiddleware';

export interface IRoute {
  path: string;
  controller: IController;
  middlewares?: IMiddleware[];
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  schemas?: {
    body?: ZodObject<any>;
    params?: ZodObject<any>;
    query?: ZodObject<any>;
    response?: Record<number, ZodObject<any>>;
  };
}
