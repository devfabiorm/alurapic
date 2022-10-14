import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { Observable } from 'rxjs';
import { NestResponse } from './nest-response';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  private readonly httpAdapter: AbstractHttpAdapter;

  constructor(private readonly adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((controllerResponse: NestResponse) => {
        if (controllerResponse instanceof NestResponse) {
          const ctx = context.switchToHttp();
          const response = ctx.getResponse();
          const { body, headers, status } = controllerResponse;

          const headersNames = Object.getOwnPropertyNames(headers);

          headersNames.forEach((headerName) => {
            const headerValue = headersNames[headerName];

            this.httpAdapter.setHeader(response, headerName, headerValue);
          });

          this.httpAdapter.status(response, status);

          return body;
        }

        return controllerResponse;
      }),
    );
  }
}
