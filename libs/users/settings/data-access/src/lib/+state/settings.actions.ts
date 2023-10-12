import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ISettings } from '../model/settings.interface';

export const SettingsActions = createActionGroup({
  source: 'Settings',
  events: {
    loadSettings: emptyProps(),
    loadSettingsSuccess: props<{ settings: ISettings }>(),
    // loadSettingsFailure: props<{ error: unknown }>(),
    setArticlesViewStyleTypeList: emptyProps(),
    setArticlesViewStyleTypeTile: emptyProps(),
    setArticlesStyleType: props<{ articlesViewStyleType: string }>(),
    setArticlesStyleTypeSuccess: props<{ articlesViewStyleType: string }>(),    
  }
});
