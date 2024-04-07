import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../models/folder.interface';

export const folderActions = createActionGroup({
  source: 'folder',
  events: {
    LoadFolders: emptyProps(),
    LoadFoldersSuccess: props<{ folders: Folder[] }>(),
    LoadFoldersFailure: props<{ error: unknown }>(),

    CreateFolder: props<{ title: string }>(),
    CreateFolderSuccess: props<{ folder: Folder }>(),
    CreateFolderFailure: props<{ error: unknown }>(),
  },
});
