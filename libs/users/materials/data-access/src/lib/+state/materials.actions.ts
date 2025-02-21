import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateFolderDTO, FolderDTO, CreateMaterialDTO, MaterialDTO, FolderEntity } from '@users/core/data-access';
import { onSuccessEditionCbType } from '@users/users/data-access';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Init Folders': emptyProps(),
    'Load Folders Success': props<{ folders: FolderEntity[] }>(),
    'Load Folders Failure': props<{ error: any }>(),
    'Add Folder': props<{folderData: CreateFolderDTO}>(),
    'Add Folder Success': props<{folderData: FolderEntity}>(),
    'Add Folder Failure': props<{error: any}>(),
    'Edit Folder': props<{folderData: CreateFolderDTO, id: number, onSuccess: onSuccessEditionCbType}>(),
    'Edit Folder Success': props<{folderData: FolderDTO}>(),
    'Edit Folder Failure': props<{error: any}>(),
    'Delete Folder': props<{id: number}>(),
    'Delete Folder Success': props<{id: number}>(),
    'Delete Folder Failure': props<{error: any}>(),
    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ folders: MaterialDTO[] }>(),
    'Load Materials Failure': props<{ error: any }>(),
    'Add Material': props<{folderData: CreateMaterialDTO}>(),
    'Add Material Success': props<{folderData: MaterialDTO}>(),
    'Add Material Failure': props<{error: any}>(),
    'Edit Material': props<{folderData: CreateMaterialDTO, id: number, onSuccess: onSuccessEditionCbType}>(),
    'Edit Material Success': props<{folderData: MaterialDTO}>(),
    'Edit Material Failure': props<{error: any}>(),
    'Delete Material': props<{id: number}>(),
    'Delete Material Success': props<{id: number}>(),
    'Delete Material Failure': props<{error: any}>(),
  },
});
