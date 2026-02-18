import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from '../logger.service';
import { ErrorResponse } from '../interfaces/error-response.interface';

const FILTER_CONTEXT = 'HttpExceptionFilter';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(LoggerService) private readonly logger: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = this.getStatus(exception);
    const body = this.getResponseBody(exception, status);

    const msg = (body as ErrorResponse).message;
    const messageStr = Array.isArray(msg) ? msg.join(', ') : msg;
    this.logger.error(
      `${status} ${(body as ErrorResponse).error ?? 'Error'}: ${messageStr}`,
      exception instanceof Error ? exception.stack : undefined,
      FILTER_CONTEXT,
    );

    response.status(status).json(body);
  }

  private getStatus(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getResponseBody(exception: unknown, status: number): ErrorResponse {
    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      if (typeof res === 'object' && res !== null && 'message' in res) {
        const obj = res as { message?: string | string[]; error?: string };
        return {
          statusCode: status,
          message: obj.message ?? exception.message,
          error: obj.error,
        };
      }
      return {
        statusCode: status,
        message: exception.message,
      };
    }
    const message =
      exception instanceof Error ? exception.message : 'Internal server error';
    return {
      statusCode: status,
      message,
      error: 'Internal Server Error',
    };
  }
}
