import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IDeleteItem, IFolder, IMaterial, IMaterialPost } from '../models/models';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materials Folders': emptyProps(),
    'Load Materials Folders Success': props<{ folders: IFolder[] }>(),
    'Load Materials Folders Failure': props<{ error: unknown }>(),
    'Get Folders Materials': emptyProps(),
    'Add Materials Folder': props<{ title: string }>(),
    'Add Materials Folder Success': props<{ folder: IFolder }>(),
    'Add Materials Folder Fail': props<{ error: unknown }>(),
    'Delete Materials Folder': props<{ folder: IDeleteItem }>(),
    'Delete Materials Folder Success': emptyProps(),
    'Delete Materials Folder Fail': props<{ error: unknown }>(),
    'Load Materialss': emptyProps(),
    'Load Materialss Success': props<{ materials: IMaterial[] }>(),
    'Load Materialss Failure': props<{ error: unknown }>(),
    'Add Material': props<{ material: IMaterialPost }>(),
    'Add Material Success': props<{ material: IMaterial }>(),
    'Add Material Fail': props<{ error: unknown }>(),
    'Delete Material': props<{ deleteItem: IDeleteItem }>(),
    'Delete Material Success': emptyProps(),
    'Delete Material Fail': props<{ error: unknown }>()
  }
});
