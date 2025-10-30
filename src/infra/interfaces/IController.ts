export interface IControllerRequest<
  TBody = unknown,
  TParams = Record<string, string> | unknown,
  TQuery = Record<string, string | string[]>,
> {
  body: TBody;
  metadata?: {
    adminId?: string;
  };
  params: TParams;
  query: TQuery;
}

export interface IControllerResponse<TBody = unknown> {
  body: TBody;
  statusCode: number;
}

export interface IController {
  execute(request: IControllerRequest): Promise<IControllerResponse>;
}
