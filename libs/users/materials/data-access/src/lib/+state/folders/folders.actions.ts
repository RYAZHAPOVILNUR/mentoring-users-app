import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../../models/folder.model';
import { FolderAdd } from '../../models/folder-add.model';

export const FoldersActions = createActionGroup({
  source: 'Folders',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{folders: Folder[]}>(),
    'Load Folders Failure': props<{error: Error}>(),

    'Add Folder': props<{title: FolderAdd}>(),
    'Add Folder Success': props<{folder: Folder}>(),
    'Add Folder Failure': props<{error: Error}>(),

    'Delete Folder': props<{id: number}>(),
    'Delete Folder Success': props<{id: number}>(),
    'Delete Folder Failure': props<{error: Error}>(),
  },
});
