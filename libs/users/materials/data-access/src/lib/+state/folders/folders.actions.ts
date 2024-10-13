import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IFolder } from '../../models/folder.interface';
import { LoadingStatus } from '../../models/loading-status.enum';

export const FoldersActions = createActionGroup({
  source: 'Folders',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folders: IFolder[]}>(),
    'Load Folders Failure': props<{
      status: LoadingStatus.Error;
      error: Error
    }>()
  }
});
