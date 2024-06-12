import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ data: unknown }>(),
    'Load Materials Failure': props<{ error: unknown }>(),
  },
});
