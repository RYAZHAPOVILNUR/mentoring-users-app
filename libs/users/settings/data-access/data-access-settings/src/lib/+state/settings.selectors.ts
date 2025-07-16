import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SETTINGS_FEATURE_KEY } from './settings.reducer';
import { Settings } from '../interfaces/settings.interface';

export const selectSettingsState = createFeatureSelector<Settings>(SETTINGS_FEATURE_KEY);

export const selectArticlesViewStyleType = createSelector(selectSettingsState, (state: Settings) => {
  return state.articlesViewStyleType;
});
