import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FoldersEntity } from '../../models/folders.models';
import { CreateFolder } from '../../models/create-folder.models';

export const folderActions = createActionGroup({
  source: 'Folders',
  events: {
    loadFolders: emptyProps(),
    loadFoldersSuccess: props<{ folders: FoldersEntity[] }>(),
    loadFoldersFailed: props<{ error: Error }>(),

    addFolder: props<{ folderData: CreateFolder }>(),
    addFolderSuccess: props<{ folderData: FoldersEntity }>(),
    addFolderFailed: props<{ error: Error }>(),

    deleteFolder: props<{ id: number }>(),
    deleteFolderSuccess: props<{ id: number }>(),
    deleteFolderFailed: props<{ error: Error }>(),

    loadFolder: emptyProps(),
    loadFolderSuccess: props<{ folder: FoldersEntity }>(),
    loadFolderFailed: props<{ error: Error }>(),
  },
});
