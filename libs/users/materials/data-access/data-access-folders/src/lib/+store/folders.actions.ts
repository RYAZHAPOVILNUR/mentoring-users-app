import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { ConfirmDialogData } from '@shared/ui-confirm-dialog';
import { CreateFolder, Folder } from '@users/ui-folders';

export const FoldersActions = createActionGroup({
  source: 'Materials',
  events: {
    loadFolders: emptyProps(),
    loadFoldersSuccess: props<{ folders: Folder[] }>(),
    loadFoldersFailure: emptyProps(),
    deleteFolder: props<{ id: number }>(),
    deleteFolderSuccess: props<{ deletedFolderId: number }>(),
    deleteFolderFailure: emptyProps(),
    createFolder: props<{ title: CreateFolder }>(),
    createFolderSuccess: props<{ createdFolder: Folder }>(),
    createFolderFailure: emptyProps(),
    openCreateFolderDialog: emptyProps(),
    openDeleteFolderDialog: props<{ data: ConfirmDialogData; id: number }>(),
  },
});
