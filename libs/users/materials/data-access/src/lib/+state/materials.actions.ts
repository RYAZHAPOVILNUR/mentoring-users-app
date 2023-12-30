import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IFolder, IFolderId, IFolderTitle } from '../models/ifolder';
import { IMaterial, IMaterialId, IMaterialPost } from '../models/imaterial';

export const FoldersActions = createActionGroup({
  source: 'Materials',
  events: {
    //Loading folders
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folders: IFolder[] }>(),
    'Load Folders Failure': props<{ error: unknown }>(),

    //Deleting folder
    'Delete Folder': props<{ id: IFolderId }>(),
    'Delete Folder Success': props<{ id: IFolderId }>(),
    'Delete Folder Failure': props<{ error: unknown }>(),

    //Creating folder
    'Create Folder': props<{ title: IFolderTitle }>(),
    'Create Folder Success': props<{ folder: IFolder }>(),
    'Create Folder Failure': props<{ error: unknown }>(),

    //Opening folder - going to materials page
    'Open Folder': emptyProps(),
    'Open Folder Success': props<{ folder_id: IFolderId }>(),
    'Open Folder Failure': props<{ error: unknown }>(),
  },
});

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    //Loading materials
    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ materials: IMaterial[] }>(),
    'Load Materials Failure': props<{ error: unknown }>(),

    //Deleting material
    'Delete Material': props<{ id: IMaterialId }>(),
    'Delete Material Success': props<{ id: IMaterialId }>(),
    'Delete Material Failure': props<{ error: unknown }>(),

    //Creating material
    'Create Material': props<{ material: IMaterialPost }>(),
    'Create Material Success': props<{ material: IMaterial }>(),
    'Create Material Failure': props<{ error: unknown }>(),
  },
});
