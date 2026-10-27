export const demoScenarios = ['loading', 'empty', 'error', 'success'] as const;

export type DemoScenario = (typeof demoScenarios)[number];

export interface HomeDemoItem {
  id: string;
  title: string;
  description: string;
}
