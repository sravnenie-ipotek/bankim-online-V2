import winston from 'winston';

const isProduction = process.env.NODE_ENV === 'production';

export class WinstonLoggerFactory {
  create(): winston.Logger {
    const format = this.getFormat();
    return winston.createLogger({
      level: this.getLevel(),
      format,
      transports: [new winston.transports.Console()],
    });
  }

  private getFormat(): winston.Logform.Format {
    return isProduction ? this.getProductionFormat() : this.getDevelopmentFormat();
  }

  private getProductionFormat(): winston.Logform.Format {
    return winston.format.combine(
      winston.format.timestamp({ format: 'iso' }),
      winston.format.json(),
    );
  }

  private getDevelopmentFormat(): winston.Logform.Format {
    return winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.colorize({ all: true }),
      winston.format.printf(({ level, message, timestamp, context }) => {
        const ctx = context ? `[${context}] ` : '';
        return `${timestamp} ${level}: ${ctx}${message}`;
      }),
    );
  }

  private getLevel(): string {
    return process.env.LOG_LEVEL ?? (isProduction ? 'info' : 'debug');
  }
}
