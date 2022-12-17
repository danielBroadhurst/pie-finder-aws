import { ExceptionBase } from '../../../libs/exceptions';

export class PieStoreAlreadyExistsError extends ExceptionBase {
  static readonly message = 'Pie Store already exists';

  public readonly code = 'PIE_STORE.ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(PieStoreAlreadyExistsError.message, cause, metadata);
  }
}