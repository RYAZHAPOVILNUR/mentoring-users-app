import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateIFolder, IFolder } from '../models/folder.interface';

export const MaterialsActions = createActionGroup({
  source: 'Materials Page',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{folders: IFolder[]}>(),
    'Load Folders Failure': props<{ error: null }>(),

    'Add Folder':props<{newFolder: CreateIFolder}>(),
    'Add Folder Success': props<{newFolder: IFolder}>(),
    'Add Folder Failure': props<{ error: null }>(),

    'Delete Folder': props<{id: number}>(),
    'Delete Folder Success': props<{id: number}>(),
    'Delete Folder Failure': props<{ error: null }>(),
  }
});
