export class Result<T> {
  public static ok<U> (value?: U) : Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U> (error: any): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine (results: Result<any>[]) : Result<any> {
    for (let result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok();
  }
  public isSuccess: boolean;
  public isFailure: boolean;
  public error: T | string | undefined;
  private _value: T | undefined;

  public constructor (isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error('InvalidOperation: A result cannot be successful and contain an error');
    }
    if (!isSuccess && !error) {
      throw new Error('InvalidOperation: A failing result needs to contain an error message');
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue () : T {
    if (!this.isSuccess) {
      throw new Error("Can't get the value of an error result. Use 'errorValue' instead.");
    }

    return this._value as T;
  }

  public errorValue (): string {
    return this.error ? this.error.toString() : 'Unkown Error';
  }
}