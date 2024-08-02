import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AddFolderType, FolderType } from '../models/folder.type';

export const foldersActions = createActionGroup({
  source: 'folders',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folders: FolderType[] }>(),
    'Load Folders Failed': props<{ error: Error }>(),

    'Add Folders': props<{ title: AddFolderType }>(),
    'Add Folders Success': props<{ folder: FolderType }>(),
    'Add Folders Failed': props<{ error: Error }>(),

    'Delete Folders': props<{ id: number }>(),
    'Delete Folders Success': props<{ id: number }>(),
    'Delete Folders Failed': props<{ error: Error }>(),
  },
});
