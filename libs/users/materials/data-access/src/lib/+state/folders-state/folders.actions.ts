import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FolderInterface } from '../../interfaces/folder.interface';

export const FoldersActions = createActionGroup({
  source: 'Folders',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folders: FolderInterface[] }>(),
    'Load Folders Failure': props<{ error: Error }>(),
  },
});
