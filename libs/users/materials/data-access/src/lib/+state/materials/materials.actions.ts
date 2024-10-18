import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoadingStatus } from '../../models/loading-status.enum';
import { IMaterial } from '../../models/material.interface';
import { CreateFolderDTO } from '../../models/folders-dto.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ materials: IMaterial[] }>(),
    'Load Materials Failure': props<{
      status: LoadingStatus.Error;
      error: Error;
    }>(),
    'Add Material': props<{ materialData: CreateFolderDTO }>(),
    'Add Materials Success': props<{ material: IMaterial }>(),
    'Add Materials Failure': props<{ error: Error; }>(),
    'Delete Material': props<{ materialId: number }>(),
    'Delete Materials Success': props<{ materialId: number }>(),
    'Delete Materials Failure': props<{ error: Error }>()
  }
});
