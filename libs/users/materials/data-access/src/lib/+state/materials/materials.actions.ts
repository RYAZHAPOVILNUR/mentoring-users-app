import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AddMaterialType, MaterialType } from '../models/material.type';

export const materialsActions = createActionGroup({
  source: 'materials',
  events: {
    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ materials: MaterialType[] }>(),
    'Load Materials Failed': props<{ error: Error }>(),

    'Add Materials': props<{ material: AddMaterialType }>(),
    'Add Materials Success': props<{ material: MaterialType }>(),
    'Add Materials Failed': props<{ error: Error }>(),

    'Delete Materials': props<{ id: number }>(),
    'Delete Materials Success': props<{ id: number }>(),
    'Delete Materials Failed': props<{ error: Error }>(),
  },
});
