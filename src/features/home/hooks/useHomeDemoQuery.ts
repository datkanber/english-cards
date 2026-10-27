import { useQuery } from '@tanstack/react-query';

import { getMockHomeItems } from '../services/mock-home-service';
import type { DemoScenario } from '../types/home';

export const homeDemoQueryKey = ['home-demo'] as const;

export function useHomeDemoQuery(scenario: DemoScenario) {
  return useQuery({
    queryKey: [...homeDemoQueryKey, scenario],
    queryFn: ({ signal }) => getMockHomeItems(scenario, signal),
    retry: false,
  });
}
