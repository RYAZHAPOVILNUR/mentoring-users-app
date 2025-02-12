import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materialss': emptyProps(),
    'Load Materialss Success': props<{ data: unknown }>(),
    'Load Materialss Failure': props<{ error: unknown }>(),
  },
});

export const initUsers = createAction('[Folders Page] Init');
