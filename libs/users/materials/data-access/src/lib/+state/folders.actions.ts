import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IFolder } from '../models/folder.model';
import { IAddFolder } from '../models/folder-add.model';

export const FoldersActions = createActionGroup({
  source: 'Folders',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folders: IFolder[] }>(),
    'Load Folders Failure': props<{ error: any }>(),

    'Add Folder': props<{ folder: IAddFolder }>(),
    'Add Folder Success': props<{ folder: IFolder }>(),
    'Add Folder Failure': props<{ error: any }>(),

    'Delete Folder': props<{ id: number }>(),
    'Delete Folder Success': props<{ id: number }>(),
    'Delete Folder Failure': props<{ error: any }>(),
  },
});
