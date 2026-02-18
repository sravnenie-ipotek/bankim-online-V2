import { Injectable } from '@nestjs/common';
import { LoggerService as NestLoggerService } from '@nestjs/common';
import winston from 'winston';
import { WinstonLoggerFactory } from './helpers/winston-logger-factory';
import { ILogger } from './interfaces/logger.interface';

@Injectable()
export class LoggerService implements ILogger, NestLoggerService {
  private readonly winston: winston.Logger;

  constructor() {
    const factory = new WinstonLoggerFactory();
    this.winston = factory.create();
  }

  log(message: string, context?: string): void {
    this.winston.info(message, { context });
  }

  error(message: string, stack?: string, context?: string): void {
    this.winston.error(message, { context, stack });
  }

  warn(message: string, context?: string): void {
    this.winston.warn(message, { context });
  }

  debug(message: string, context?: string): void {
    this.winston.debug(message, { context });
  }

  verbose(message: string, context?: string): void {
    this.winston.verbose(message, { context });
  }
}
