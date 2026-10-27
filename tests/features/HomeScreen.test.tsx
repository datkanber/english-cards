import { HomeScreen } from '@/features/home/HomeScreen';

import { renderWithProviders } from '../test-utils';

describe('HomeScreen query states', () => {
  it('shows an accessible loading state followed by local success content', async () => {
    const { findByTestId, getByTestId } = await renderWithProviders(<HomeScreen />);

    expect(getByTestId('home-query-loading')).toBeOnTheScreen();
    expect(await findByTestId('home-query-success', {}, { timeout: 2_000 })).toBeOnTheScreen();
  });
});
