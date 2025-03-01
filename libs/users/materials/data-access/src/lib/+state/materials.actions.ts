import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateFolderDTO, FolderDTO, CreateMaterialDTO, MaterialDTO, FolderEntity, MaterialEntity } from 'libs/core/data-access/src/index';
export type onSuccessEditionCbType = () => void;

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Init Folders': emptyProps(),
    'Load Folders Success': props<{ folders: FolderEntity[] }>(),
    'Load Folders Failure': props<{ error: any }>(),
    'Add Folder': props<{folderData: CreateFolderDTO}>(),
    'Add Folder Success': props<{folderData: FolderEntity}>(),
    'Add Folder Failure': props<{error: any}>(),
    'Edit Folder': props<{folderData: FolderEntity, id: number, onSuccess: onSuccessEditionCbType}>(),
    'Edit Folder Success': props<{folderData: FolderDTO}>(),
    'Edit Folder Failure': props<{error: any}>(),
    'Load Folder': emptyProps(),
    'Load Folder Success': props<{folderData: FolderEntity}>(),
    'Load Folder Failure': props<{error: any}>(),
    'Delete Folder': props<{id: number}>(),
    'Delete Folder Success': props<{id: number}>(),
    'Delete Folder Failure': props<{error: any}>(),
    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ folders: MaterialDTO[] }>(),
    'Load Materials Failure': props<{ error: any }>(),
    'Add Material': props<{materialData: CreateMaterialDTO}>(),
    'Add Material Success': props<{materialData: MaterialEntity}>(),
    'Add Material Failure': props<{error: any}>(),
    'Edit Material': props<{materialData: MaterialEntity, id: number, onSuccess: onSuccessEditionCbType}>(),
    'Edit Material Success': props<{materialData: MaterialEntity}>(),
    'Edit Material Failure': props<{error: any}>(),
    'Delete Material': props<{id: number}>(),
    'Delete Material Success': props<{id: number}>(),
    'Delete Material Failure': props<{error: any}>(),
  },
});
