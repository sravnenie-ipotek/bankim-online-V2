import type { Logger as TypeOrmLogger, QueryRunner } from 'typeorm';
import { LoggerService } from './logger.service';

const TYPEORM_CONTEXT = 'TypeORM';

export class TypeOrmWinstonLogger implements TypeOrmLogger {
  constructor(private readonly logger: LoggerService) {}

  logQuery(query: string, parameters?: unknown[], _queryRunner?: QueryRunner): void {
    const msg = parameters?.length
      ? `query: ${query} -- parameters: ${JSON.stringify(parameters)}`
      : `query: ${query}`;
    this.logger.debug(msg, TYPEORM_CONTEXT);
  }

  logQueryError(
    error: string | Error,
    query: string,
    parameters?: unknown[],
    _queryRunner?: QueryRunner,
  ): void {
    const errMsg = error instanceof Error ? error.message : error;
    const msg = `query error: ${errMsg} -- query: ${query}`;
    const stack = error instanceof Error ? error.stack : undefined;
    this.logger.error(msg, stack, TYPEORM_CONTEXT);
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: unknown[],
    _queryRunner?: QueryRunner,
  ): void {
    const msg = `slow query (+${time}ms): ${query}`;
    if (parameters?.length) {
      this.logger.warn(`${msg} -- parameters: ${JSON.stringify(parameters)}`, TYPEORM_CONTEXT);
    } else {
      this.logger.warn(msg, TYPEORM_CONTEXT);
    }
  }

  logSchemaBuild(message: string, _queryRunner?: QueryRunner): void {
    this.logger.debug(message, TYPEORM_CONTEXT);
  }

  logMigration(message: string, _queryRunner?: QueryRunner): void {
    this.logger.log(message, TYPEORM_CONTEXT);
  }

  log(
    level: 'log' | 'info' | 'warn',
    message: string,
    _queryRunner?: QueryRunner,
  ): void {
    const str = typeof message === 'string' ? message : String(message);
    if (level === 'warn') {
      this.logger.warn(str, TYPEORM_CONTEXT);
    } else {
      this.logger.log(str, TYPEORM_CONTEXT);
    }
  }
}
