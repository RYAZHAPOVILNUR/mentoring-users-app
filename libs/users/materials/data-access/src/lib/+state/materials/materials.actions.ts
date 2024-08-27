import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MaterialType } from '@users/core/data-access';

export const MaterialsActions = createActionGroup({
  source: 'materials',
  events: {
    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ materials: MaterialType[] }>(),
    'Load Materials Failure': props<{ error: Error }>(),
  },
});
