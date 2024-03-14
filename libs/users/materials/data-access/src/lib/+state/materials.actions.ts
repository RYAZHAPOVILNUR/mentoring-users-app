import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IFolder, IFolderCreate } from '../models/folders.model';
import { IMaterial, IMaterialCreate } from '../models/materials.model';

export const FoldersActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folders: IFolder[] }>(),
    'Load Folders Failed': props<{ error: any }>(),
    'Add Folders': props<{ foldersData: IFolderCreate }>(),
    'Add Folders Success': props<{ foldersData: IFolder }>(),
    'Add Folders Failed': props<{ error: any }>(),
    'Delete Folders': props<{ id: number }>(),
    'Delete Folders Success': props<{ id: number }>(),
    'Delete Folders Failed': props<{ error: any }>(),
    'Open Folder': props<{ folder: IFolder }>(),
    'Open Folder Success': props<{ folder: IFolder }>(),
    'Open Folder Failed': props<{ error: any }>(),
    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ materials: IMaterial[] }>(),
    'Load Materials Failed': props<{ error: any }>(),
    'Delete Materials': props<{ id: number }>(),
    'Delete Materials Success': props<{ id: number }>(),
    'Delete Materials Failed': props<{ error: any }>(),
    'Add Materials': props<{ material: IMaterialCreate }>(),
    'Add Materials Success': props<{ material: IMaterial }>(),
    'Add Materials Failed': props<{ error: any }>(),
    'Add Materials PDF': props<{ material: IMaterialCreate }>(),
    'Add Materials PDF Success': props<{ material: IMaterial }>(),
    'Add Materials PDF Failed': props<{ error: any }>(),
  },
});
