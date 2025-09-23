import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Settings } from '../interfaces/settings.interface';

import { SETTINGS_FEATURE_KEY } from './settings.reducer';

export const selectSettingsState = createFeatureSelector<Settings>(SETTINGS_FEATURE_KEY);

export const selectArticlesViewStyleType = createSelector(
  selectSettingsState,
  (state: Settings) => {
    return state.articlesViewStyleType;
  },
);
