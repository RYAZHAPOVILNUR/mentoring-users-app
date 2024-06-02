import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Folder } from '../models/folder.interface';
import { MaterialStatus } from '../enums/materials-status.enum';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folders: Folder[] }>(),
    'Load Folders Failure': props<{
      status: MaterialStatus.Error;
      error: Error;
    }>(),

    'Create Folder Success': props<{ folder: Folder }>(),
    'Create Folder Failure': props<{
      status: MaterialStatus.Error;
      error: Error;
    }>(),

    'Delete Folder': props<{ id: number }>(),
    'Delete Folder Success': props<{ id: number }>(),
    'Delete Folder Failure': props<{ error: Error }>(),
  },
});
