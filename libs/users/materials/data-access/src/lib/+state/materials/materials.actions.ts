import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MaterialsEntity } from './materials.reducer';
import { CreateMaterialDTO } from '../../models/materials-dto.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materials': props<{ folderId: number }>(),
    'Load Materials Success': props<{ materials: MaterialsEntity[] }>(),
    'Load Materials Failure': props<{ error: Error; }>(),
    'Add Material': props<{ materialData: CreateMaterialDTO }>(),
    'Add Materials Success': props<{ material: MaterialsEntity }>(),
    'Add Materials Failure': props<{ error: Error; }>(),
    'Delete Material': props<{ materialId: number }>(),
    'Delete Materials Success': props<{ materialId: number }>(),
    'Delete Materials Failure': props<{ error: Error }>()
  }
});
