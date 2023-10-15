import * as fromSettings from './settings.reducer';
import { selectSettingsState } from './settings.selectors';

describe('Settings Selectors', () => {
  it('should select the feature state', () => {
    const result = selectSettingsState({
      [fromSettings.settingsFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
