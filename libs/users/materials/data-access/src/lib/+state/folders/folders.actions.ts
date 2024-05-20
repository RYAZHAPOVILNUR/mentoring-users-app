import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateFolderDTO, FolderDTO } from '@users/core/data-access';
import { FoldersErrors } from './folders.reducer';

export const FoldersActions = createActionGroup({
  source: 'Folders',
  events: {
    'Init Folders': emptyProps(),
    'Load Folders Success': props<{ folders: FolderDTO[] }>(),
    'Load Folders Failure': props<{ error: FoldersErrors }>(),

    'Add Folder': props<{ folder: CreateFolderDTO }>(),
    'Add Folder Success': props<{ folder: FolderDTO }>(),
    'Add Folder Failure': props<{ error: FoldersErrors }>(),

    'Remove Folder': props<{ id: number }>(),
    'Remove Folder Success': props<{ id: number }>(),
    'Remove Folder Failure': props<{ error: FoldersErrors }>(),
  },
});
