import { NestResponse } from './nest-response';

export class NestResponseBuilder {
  private nestResponse: NestResponse = {
    status: 200,
    headers: {},
    body: {},
  };

  public status(status: number): NestResponseBuilder {
    this.nestResponse.status = status;
    return this;
  }

  public headers(headers: object): NestResponseBuilder {
    this.nestResponse.headers = headers;
    return this;
  }

  public body(body: object): NestResponseBuilder {
    this.nestResponse.body = body;
    return this;
  }

  public build(): NestResponse {
    return new NestResponse(this.nestResponse);
  }
}
