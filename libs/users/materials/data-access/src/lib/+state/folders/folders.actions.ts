import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const FoldersActions = createActionGroup({
  source: 'Actions',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ data: unknown }>(),
    'Load Folders Failure': props<{ error: unknown }>(),
  }
});
