type Context = {
  requestId: string;
}

export class RequestContextService {
  static getContext(): Context {
    return {
      requestId: 'a-request-id',
    };
  }
  static getRequestId(): string {
    return 'a-request-id';
  }
}