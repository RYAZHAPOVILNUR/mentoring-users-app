import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../model/folder.model';
import { CreateFolder } from '../model/folder-create.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    createFolder: props<{ folder: CreateFolder }>(),
    createFolderSuccess: emptyProps(),
    createFolderFailed: props<{ error: Error }>(),

    loadFolder: emptyProps(),
    loadFolderSuccess : props<{folders:Folder[]}>(),
    loadFolderFailed: props<{error: Error}>(),

    getFolder: props<{id:string}>(),
    getFolderSuccess : props<{folder:Folder}>(),
    getFolderFailed: props<{error: Error}>(),
  }
});
