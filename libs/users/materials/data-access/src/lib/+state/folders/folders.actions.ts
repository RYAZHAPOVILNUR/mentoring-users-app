import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../../models/folder.model';
import { CreateFolder } from '../../models/create-folder.model';

export const FoldersActions = createActionGroup({
  source: 'Folders',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folders: Folder[] }>(),
    'Load Folders Failed': props<{ error: Error }>(),

    'Add Folder': props<{ folderData: CreateFolder }>(),
    'Add Folder Success': props<{ folderData: Folder }>(),
    'Add Folder Failed': props<{ error: Error }>(),

    'Delete Folder': props<{ id: number }>(),
    'Delete Folder Success': props<{ id: number }>(),
    'Delete Folder Failed': props<{ error: Error }>(),
  },
});
