import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MaterialType, CreateMaterialDTO } from '@users/core/data-access';

export const MaterialsActions = createActionGroup({
  source: 'materials',
  events: {
    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ materials: MaterialType[]; }>(),
    'Load Materials Failure': props<{ error: Error; }>(),

    'Add Material': props<{ materialData: CreateMaterialDTO; }>(),
    'Add Material Success': props<{ material: MaterialType; }>(),
    'Add Material Failed': props<{ error: Error; }>(),

    'Delete Material': props<{ materialId: number; }>(),
    'Delete Material Success': props<{ materialId: number; }>(),
    'Delete Material Failed': props<{ error: Error; }>(),
  }
});