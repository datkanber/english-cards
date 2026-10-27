import { z } from 'zod';

declare const process: {
  env: {
    EXPO_PUBLIC_API_BASE_URL?: string;
  };
};

const emptyStringToUndefined = (value: unknown): unknown =>
  typeof value === 'string' && value.trim() === '' ? undefined : value;

export const publicEnvSchema = z
  .object({
    EXPO_PUBLIC_API_BASE_URL: z.preprocess(
      emptyStringToUndefined,
      z.string().url('EXPO_PUBLIC_API_BASE_URL must be a valid URL').optional(),
    ),
  })
  .superRefine((value, context) => {
    const apiBaseUrl = value.EXPO_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      return;
    }

    const url = new URL(apiBaseUrl);

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      context.addIssue({
        code: 'custom',
        path: ['EXPO_PUBLIC_API_BASE_URL'],
        message: 'EXPO_PUBLIC_API_BASE_URL must use HTTP or HTTPS',
      });
    }

    if (url.username || url.password) {
      context.addIssue({
        code: 'custom',
        path: ['EXPO_PUBLIC_API_BASE_URL'],
        message: 'EXPO_PUBLIC_API_BASE_URL must not contain credentials',
      });
    }

    if (!__DEV__ && url.protocol !== 'https:') {
      context.addIssue({
        code: 'custom',
        path: ['EXPO_PUBLIC_API_BASE_URL'],
        message: 'EXPO_PUBLIC_API_BASE_URL must use HTTPS in production',
      });
    }
  });

const parsedEnv = publicEnvSchema.safeParse({
  EXPO_PUBLIC_API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
});

if (!parsedEnv.success) {
  const invalidFields = [
    ...new Set(parsedEnv.error.issues.map((issue) => issue.path.join('.') || 'environment')),
  ].join(', ');

  throw new Error(`Invalid public environment configuration: ${invalidFields}`);
}

export const env = {
  apiBaseUrl: parsedEnv.data.EXPO_PUBLIC_API_BASE_URL,
} as const;

export type PublicEnv = typeof env;
