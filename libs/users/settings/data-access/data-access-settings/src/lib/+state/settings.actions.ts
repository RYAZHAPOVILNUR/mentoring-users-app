import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Settings } from '../interfaces/settings.interface';

export const SettingsActions = createActionGroup({
  source: 'Settings',
  events: {
    loadSettings: emptyProps(),
    loadSettingsSuccess: props<{ settings: Settings }>(),
    // loadSettingsFailure: props<{ error: unknown }>(),
    setArticlesStyleType: props<{ articlesViewStyleType: string }>(),
    setArticlesStyleTypeSuccess: props<{ articlesViewStyleType: string }>(),
  },
});
