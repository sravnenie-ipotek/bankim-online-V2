import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';
import { LoggerService } from '../logger.service';

const INTERCEPTOR_CONTEXT = 'HttpLoggingInterceptor';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(LoggerService) private readonly logger: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const httpCtx = context.switchToHttp();
    const request = httpCtx.getRequest<Request>();
    const { method, url } = request;
    const start = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const status = httpCtx.getResponse().statusCode;
          const duration = Date.now() - start;
          this.logger.log(
            `${method} ${url} ${status} +${duration}ms`,
            INTERCEPTOR_CONTEXT,
          );
        },
        error: () => {
          const duration = Date.now() - start;
          this.logger.warn(
            `${method} ${url} failed +${duration}ms`,
            INTERCEPTOR_CONTEXT,
          );
        },
      }),
    );
  }
}
