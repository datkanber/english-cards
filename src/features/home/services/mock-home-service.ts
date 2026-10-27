import type { DemoScenario, HomeDemoItem } from '../types/home';

export const MOCK_RESPONSE_DELAY_MS = 350;

const demoItems: readonly HomeDemoItem[] = [
  {
    id: 'typed-services',
    title: 'Typed service boundary',
    description: 'Screen code consumes typed data without knowing how it is loaded.',
  },
  {
    id: 'query-state',
    title: 'Query-managed state',
    description: 'TanStack Query owns loading, error, cache, and retry behavior.',
  },
];

function createAbortError() {
  const error = new Error('The mock request was cancelled.');
  error.name = 'AbortError';
  return error;
}

function wait(delayMs: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(createAbortError());
      return;
    }

    const handleAbort = () => {
      clearTimeout(timer);
      reject(createAbortError());
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', handleAbort);
      resolve();
    }, delayMs);

    signal?.addEventListener('abort', handleAbort, { once: true });
  });
}

function waitUntilCancelled(signal?: AbortSignal) {
  return new Promise<never>((_resolve, reject) => {
    if (signal?.aborted) {
      reject(createAbortError());
      return;
    }

    signal?.addEventListener(
      'abort',
      () => {
        reject(createAbortError());
      },
      { once: true },
    );
  });
}

export async function getMockHomeItems(
  scenario: DemoScenario,
  signal?: AbortSignal,
): Promise<HomeDemoItem[]> {
  if (scenario === 'loading') {
    return waitUntilCancelled(signal);
  }

  await wait(MOCK_RESPONSE_DELAY_MS, signal);

  if (scenario === 'error') {
    throw new Error('The local example service returned an expected error.');
  }

  if (scenario === 'empty') {
    return [];
  }

  return demoItems.map((item) => ({ ...item }));
}
