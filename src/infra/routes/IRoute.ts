import { IController } from '@infra/interfaces/IController';
import { IMiddleware } from '@infra/interfaces/IMiddleware';
import { ZodObject } from 'zod';

export interface IRoute {
  controller: IController;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  middlewares?: IMiddleware[];
  path: string;
  schemas?: {
    body?: ZodObject<any>;
    params?: ZodObject<any>;
    query?: ZodObject<any>;
    response?: Record<number, ZodObject<any>>;
  };
}
