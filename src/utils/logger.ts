type LogContext = Readonly<Record<string, unknown>>;
type LogLevel = 'debug' | 'error' | 'info' | 'warn';

const sensitiveKeyPattern = /authorization|cookie|credential|password|secret|token|api[-_]?key/iu;
const bearerTokenPattern = /bearer\s+[a-z0-9._~+/-]+=*/giu;
const sensitiveAssignmentPattern = /(password|secret|token|api[-_]?key)=([^&\s]+)/giu;
const MAX_DEPTH = 4;
const MAX_STRING_LENGTH = 500;

const sanitizeString = (value: string): string =>
  value
    .slice(0, MAX_STRING_LENGTH)
    .replace(bearerTokenPattern, 'Bearer [REDACTED]')
    .replace(sensitiveAssignmentPattern, '$1=[REDACTED]');

const sanitizeValue = (
  value: unknown,
  key: string | undefined,
  depth: number,
  seen: WeakSet<object>,
): unknown => {
  if (key && sensitiveKeyPattern.test(key)) {
    return '[REDACTED]';
  }

  if (typeof value === 'string') {
    return sanitizeString(value);
  }

  if (
    value === null ||
    value === undefined ||
    typeof value === 'boolean' ||
    typeof value === 'number'
  ) {
    return value;
  }

  if (value instanceof Error) {
    return {
      name: sanitizeString(value.name),
      message: sanitizeString(value.message),
    };
  }

  if (typeof value !== 'object') {
    return String(value);
  }

  if (depth >= MAX_DEPTH) {
    return '[TRUNCATED]';
  }

  if (seen.has(value)) {
    return '[CIRCULAR]';
  }

  seen.add(value);

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item, undefined, depth + 1, seen));
  }

  return Object.fromEntries(
    Object.entries(value).map(([entryKey, entryValue]) => [
      entryKey,
      sanitizeValue(entryValue, entryKey, depth + 1, seen),
    ]),
  );
};

const write = (level: LogLevel, message: string, context?: LogContext): void => {
  if (!__DEV__) {
    return;
  }

  const safeMessage = sanitizeString(message);
  const safeContext = context
    ? sanitizeValue(context, undefined, 0, new WeakSet<object>())
    : undefined;

  switch (level) {
    case 'debug':
      console.debug(safeMessage, safeContext ?? '');
      break;
    case 'info':
      console.info(safeMessage, safeContext ?? '');
      break;
    case 'warn':
      console.warn(safeMessage, safeContext ?? '');
      break;
    case 'error':
      console.error(safeMessage, safeContext ?? '');
      break;
  }
};

export const logger = {
  debug: (message: string, context?: LogContext): void => write('debug', message, context),
  info: (message: string, context?: LogContext): void => write('info', message, context),
  warn: (message: string, context?: LogContext): void => write('warn', message, context),
  error: (message: string, context?: LogContext): void => write('error', message, context),
} as const;
