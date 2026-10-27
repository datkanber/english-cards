import { z } from 'zod';

export type ValidationResult<T> = { success: true; data: T } | { success: false; message: string };

export const validate = <T>(schema: z.ZodType<T>, value: unknown): ValidationResult<T> => {
  const result = schema.safeParse(value);

  if (result.success) {
    return result;
  }

  return {
    success: false,
    message: result.error.issues[0]?.message ?? 'The value is invalid.',
  };
};

export const trimmedRequiredString = (message: string) => z.string().trim().min(1, message);

export const emailAddress = (message: string) => z.string().trim().email(message);
