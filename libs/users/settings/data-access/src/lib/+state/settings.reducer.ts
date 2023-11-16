import { createFeature, createReducer, on } from '@ngrx/store';
import { SettingsActions } from './settings.actions';
import { ISettings } from '../model/settings.interface';

export const SETTINGS_FEATURE_KEY = 'settings';

export const initialState: ISettings = {
  articlesViewStyleType: 'LIST'
};

export const settingsFeature = createFeature({
  name: SETTINGS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(SettingsActions.loadSettings, state => state),
    on(SettingsActions.loadSettingsSuccess, (state, {settings}) => {return {...state, ...settings}}),
    on(SettingsActions.setArticlesStyleType, (state, {articlesViewStyleType}) => { return {...state, articlesViewStyleType}}),
    
  ),
});

