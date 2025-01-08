import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IFolder, IAddFolder, MaterialsError } from './materials.reducer';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folders: IFolder[] }>(),
    'Load Folders Failure': props<{ error: MaterialsError }>(),

    'Add Folder': props<{ folder: IAddFolder }>(),
    'Add Folder Success': props<{ folder: IFolder }>(),
    'Add Folder Failure': props<{ error: MaterialsError }>(),

    'Delete Folder': props<{ id: string }>(),
    'Delete Folder Success': props<{ id: string }>(),
    'Delete Folder Failure': props<{ error: MaterialsError }>(),

    'Open Folder': emptyProps(),
    'Open Folder Success': props<{ folder: IFolder }>(),
    'Open Folder Failure': props<{ error: MaterialsError }>(),
  },
});
