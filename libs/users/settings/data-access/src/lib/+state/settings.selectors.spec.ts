import { selectSettingsState } from './settings.selectors';

describe('Settings Selectors', () => {
  it('should select the feature state', () => {
    const result = selectSettingsState({
      // [fromSettings.settingsFeature]: {},
    });

    expect(result).toEqual({});
  });
});
