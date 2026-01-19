
import { EHttpCode } from 'shared/enums.js';
import { BaseError } from './BaseError.js';

export class ListEmptyResponseError extends BaseError {
  constructor(context?: Record<string, unknown>) {
    super(
      'List empty',
      EHttpCode.NO_CONTENT,
      'ListEmptyResponseError',
      context,
    );
  }
}
