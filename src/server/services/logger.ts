import winston, { createLogger, format, transports } from 'winston';
import morgan from 'morgan';

winston.addColors({
  info: 'blue',
  warn: 'yellow',
  error: 'red',
});

const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.splat(),
    format.printf(({ timestamp, level, message }) => {
      const d = new Date(timestamp);
      const date = d.toLocaleString('en-EN', {
        timeZone: 'UTC',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      const time = d.toLocaleString('en-EN', {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      return `${level} ${date} ${time} ${message} `;
    }),
  ),
  transports: [new transports.Console()],
});

export const middleware = morgan('combined', {
  skip: (req: any, res: any) => res.statusCode < 400,
  stream: {
    write: logger.stream,
  },
});

export const info = (message: string) => {
  logger.info({ type: 'info', message });
};

export const warning = (message: string) => {
  logger.warn({ type: 'warn', message });
};

export const error = (message: string) => {
  logger.error({ type: 'error', message });
};
