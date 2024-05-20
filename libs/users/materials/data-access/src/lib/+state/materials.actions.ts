import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateFolderDTO, FolderDTO } from '@users/core/data-access';
import { MaterialsErrors } from './materials.reducer';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Init Folders': emptyProps(),
    'Load Folders Success': props<{ folders: FolderDTO[] }>(),
    'Load Folders Failure': props<{ error: MaterialsErrors }>(),

    'Add Folder': props<{ folder: CreateFolderDTO }>(),
    'Add Folder Success': props<{ folder: FolderDTO }>(),
    'Add Folder Failure': props<{ error: MaterialsErrors }>(),

    'Remove Folder': props<{ id: number }>(),
    'Remove Folder Success': props<{ id: number }>(),
    'Remove Folder Failure': props<{ error: MaterialsErrors }>(),
  },
});
