import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FoldersEntity } from './folders.reducer';
import { CreateFolderDTO, FolderType } from '@users/core/data-access';

export const FoldersActions = createActionGroup({
    source: 'folders',
    events: {
        'Init Folders': emptyProps(),
        'Init Folders Success': props<{ folders: FoldersEntity[]; }>(),
        'Init Folders Failure': props<{ error: Error; }>(),

        'Add Folder': props<{ folderData: CreateFolderDTO; }>(),
        'Add Folder Success': props<{ folder: FolderType; }>(),
        'Add Folder Failed': props<{ error: Error; }>(),

        'Delete Folder': props<{ folderId: number; }>(),
        'Delete Folder Success': props<{ folderId: number; }>(),
        'Delete Folder Failed': props<{ error: Error; }>(),
    }
});