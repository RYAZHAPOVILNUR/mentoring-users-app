import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../../interfaces/folder.interface';

export const foldersActions = createActionGroup({
  source: 'Folders',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folders: Folder[] }>(),
    'Load Folders Failure': props<{ error: Error }>(),

    'Rename Folder': props<{ newName: string }>(),

  },
});

