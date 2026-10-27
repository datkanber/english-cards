import { fireEvent } from '@testing-library/react-native';

import { AppButton } from '@/components/ui/AppButton';

import { renderWithProviders } from '../test-utils';

describe('AppButton', () => {
  it('exposes an accessible button and handles presses', async () => {
    const onPress = jest.fn();
    const { getByRole } = await renderWithProviders(
      <AppButton onPress={onPress} title="Continue" />,
    );

    const button = getByRole('button', { name: 'Continue' });
    expect(button).toBeEnabled();

    fireEvent.press(button);

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
