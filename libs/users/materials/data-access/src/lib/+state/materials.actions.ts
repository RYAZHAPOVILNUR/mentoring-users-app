import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateFolderDTO, FolderDTO, FolderEntity} from 'libs/core/data-access/src/index';
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
  },
});
