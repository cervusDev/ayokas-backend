import { IRoute } from './IRoute';
import { healthRoutes } from './usecases/healthRoutes';

export const routes: IRoute[] = [...healthRoutes];
