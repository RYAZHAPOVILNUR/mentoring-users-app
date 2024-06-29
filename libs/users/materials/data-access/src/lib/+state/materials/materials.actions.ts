import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MaterialsEntity } from '../../models/materials.entity';
import { CreateMaterialsEntity } from '../../models/create-material.entity';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ materials: MaterialsEntity[] }>(),
    'Load Materials Failed': props<{ error: Error }>(),

    'Add Material': props<{ materialData: CreateMaterialsEntity }>(),
    'Add Material Success': props<{ materialData: MaterialsEntity }>(),
    'Add Material Failed': props<{ error: Error }>(),

    'Delete Material': props<{ id: number }>(),
    'Delete Material Success': props<{ id: number }>(),
    'Delete Material Failed': props<{ error: Error }>(),
  },
});
