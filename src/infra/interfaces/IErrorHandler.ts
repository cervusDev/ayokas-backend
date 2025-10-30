export interface IErrorHandler<TError = unknown, TContext = unknown> {
  execute(err: TError, context: TContext): Promise<void>;
}
