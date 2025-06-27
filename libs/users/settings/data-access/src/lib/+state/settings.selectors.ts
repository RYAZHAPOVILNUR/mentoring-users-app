import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SETTINGS_FEATURE_KEY } from './settings.reducer';
import { ISettings } from '../model/settings.interface';

export const selectSettingsState = createFeatureSelector<ISettings>(SETTINGS_FEATURE_KEY);

export const selectArticlesViewStyleType = createSelector(selectSettingsState, (state: ISettings) => {
  return state.articlesViewStyleType;
});
