import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IFolder, LoadingStatus, CreateFolderDTO } from '@users/materials/data-access';

export const FoldersActions = createActionGroup({
  source: 'Folders',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folders: IFolder[] }>(),
    'Load Folders Failure': props<{
      status: LoadingStatus.Error;
      error: Error
    }>(),
    'Add Folder': props<{ folderData: CreateFolderDTO }>(),
    'Add Folder Success': props<{ folder: IFolder }>(),
    'Add Folder Failure': props<{ error: Error }>(),
    'Delete Folder': props<{ folderId: number }>(),
    'Delete Folder Success': props<{ folderId: number }>(),
    'Delete Folder Failure': props<{ error: Error }>()
  }
});
