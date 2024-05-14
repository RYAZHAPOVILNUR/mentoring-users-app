import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateMaterial, FolderDTO, MaterialDTO } from '../models/types';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folders: FolderDTO[] }>(),
    'Load Foldes Failure': props<{ error: any }>(),

    'Add Folder': props<{ newFolder: Pick<FolderDTO, 'title'> }>(),
    'Add Folder Success': props<{ newFolder: FolderDTO }>(),
    'Add Folder Failure': props<{ error: any }>(),

    'Delete Folder': props<{ id: number }>(),
    'Delete Folder Success': props<{ id: number }>(),
    'Delete Folder Failure': props<{ error: any }>(),

    'Open Folder': emptyProps(),
    'Open Folder Success': props<{ id: number }>(),
    'Open Folder Failure': props<{ error: any }>(),

    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ materials: MaterialDTO[] }>(),
    'Load Materials Failure': props<{ error: any }>(),

    'Add Material': props<{ newMaterial: CreateMaterial }>(),
    'Add Material Success': props<{ newMaterial: MaterialDTO }>(),
    'Add Materual Failure': props<{ error: any }>(),

    'Delete Material': props<{ id: number }>(),
    'Delete Material Success': props<{ id: number }>(),
    'Delete Material Failure': props<{ error: any }>(),
  },
});
