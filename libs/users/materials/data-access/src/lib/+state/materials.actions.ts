import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IFolder } from '../models/models';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materialss': emptyProps(),
    'Load Materialss Success': props<{ folders: IFolder[] }>(),
    'Load Materialss Failure': props<{ error: unknown }>(),
    'Get Folders Materials': emptyProps(),
    'Add Materials Folder': props<{ title: string }>(),
    'Add Materials Folder Success': props<{ folder: IFolder }>(),
    'Add Materials Folder Fail': props<{ error: unknown }>(),
    'Delete Materials Folder': props<{ folderId: number }>(),
    'Delete Materials Success': emptyProps(),
    'Delete Materials Folder Fail': props<{ error: unknown }>(),
  }
});
