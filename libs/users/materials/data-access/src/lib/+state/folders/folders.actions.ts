import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '@users/materials/data-access';

export const folderActions = createActionGroup({
  source: 'folder',
  events: {
    LoadFolders: emptyProps(),
    LoadFoldersSuccess: props<{ folders: Folder[] }>(),
    LoadFoldersFailure: props<{ error: unknown }>(),

    CreateFolder: props<{ title: string }>(),
    CreateFolderSuccess: props<{ folder: Folder }>(),
    CreateFolderFailure: props<{ error: unknown }>(),

    RemoveFolder: props<{ folderId: number }>(),
    RemoveFolderSuccess: props<{ folderId: number }>(),
    RemoveFolderFailure: props<{ error: unknown }>(),
  },
});
