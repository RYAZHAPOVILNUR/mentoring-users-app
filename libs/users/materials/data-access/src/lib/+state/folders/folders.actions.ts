import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../../interfaces/folder.interface';

export const foldersActions = createActionGroup({
  source: 'Folders',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folders: Folder[] }>(),
    'Load Folders Failure': props<{ error: Error }>(),

    'Delete Folder': props<{ id: number }>(),
    'Delete Folder Success': props<{ id: number }>(),
    'Delete Folder Failure': props<{ error: Error }>(),

    'Create Folder': props<{ title: string }>(),
    'Create Folder Success': props<{ folder: Folder }>(),
    'Create Folder Failure': props<{ error: Error }>()

  }
});
