import AsyncStorage from '@react-native-async-storage/async-storage';

import { PREFERENCES_STORAGE_KEY } from '@/lib/storage/preferences';
import { usePreferencesStore } from '@/state/preferences-store';

describe('preferences store', () => {
  beforeEach(() => {
    usePreferencesStore.setState({
      themePreference: 'system',
      language: 'en',
      examplePreference: false,
      isHydrated: true,
    });
  });

  it('persists the non-sensitive example preference in AsyncStorage', async () => {
    await usePreferencesStore.getState().setExamplePreference(true);

    expect(usePreferencesStore.getState().examplePreference).toBe(true);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      PREFERENCES_STORAGE_KEY,
      JSON.stringify({
        themePreference: 'system',
        language: 'en',
        examplePreference: true,
      }),
    );
  });
});
