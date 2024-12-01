import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AddFolderDTO, FolderDTO } from '../../models/folder.model';

export const FoldersActions = createActionGroup({
  source: 'Folders',
  events: {
    initFolders: emptyProps(),
    loadFoldersSuccess: props<{folders: FolderDTO[]}>(),
    loadFoldersFailure: props<{error:  Error}>(),

    addFolder: props<{folder: AddFolderDTO}>(),
    addFolderSuccess: props<{folder: FolderDTO}>(),
    addFolderFailure: props<{error: Error}>(),

    deleteFolder: props<{id: number}>(),
    deleteFolderSuccess: props<{id: number}>(),
    deleteFolderFailure: props<{error:  Error}>(),

    openFolder: emptyProps(),
    openFolderSuccess: props<{folder: FolderDTO}>(),
    openFolderFailure: props<{error:  Error}>(),
  }
});
