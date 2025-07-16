import { createFeature, createReducer, on } from '@ngrx/store';

import { SettingsActions } from './settings.actions';
import { Settings } from '../interfaces/settings.interface';

export const SETTINGS_FEATURE_KEY = 'settings';

export const initialState: Settings = {
  articlesViewStyleType: 'LIST',
};

// todo remove!:
export const settingsFeature = createFeature({
  name: SETTINGS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(SettingsActions.loadSettings, (state) => state),
    on(SettingsActions.loadSettingsSuccess, (state, { settings }) => {
      return { ...state, ...settings };
    }),
    on(SettingsActions.setArticlesStyleType, (state, { articlesViewStyleType }) => {
      return { ...state, articlesViewStyleType };
    }),
  ),
});
