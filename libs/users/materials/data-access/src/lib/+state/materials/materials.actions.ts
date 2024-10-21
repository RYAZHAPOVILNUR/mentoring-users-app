import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MaterialsDTO } from '../../models/materials-dto.model';
import { CreateFolderDTO } from '../../models/folders-dto.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ materials: MaterialsDTO[] }>(),
    'Load Materials Failure': props<{ error: Error; }>(),
    'Add Material': props<{ materialData: CreateFolderDTO }>(),
    'Add Materials Success': props<{ material: MaterialsDTO }>(),
    'Add Materials Failure': props<{ error: Error; }>(),
    'Delete Material': props<{ materialId: number }>(),
    'Delete Materials Success': props<{ materialId: number }>(),
    'Delete Materials Failure': props<{ error: Error }>()
  }
});
