import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IFolder } from '../../models/folder.interface';
import { LoadingStatus } from '../../models/loading-status.enum';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folders: IFolder[] }>(),
    'Load Folders Failure': props<{
      status: LoadingStatus.Error;
      error: Error;
    }>(),

    'Create Folder Success': props<{ folder: IFolder }>(),
    'Create Folder Failure': props<{
      status: LoadingStatus.Error;
      error: Error;
    }>(),
  },
});
