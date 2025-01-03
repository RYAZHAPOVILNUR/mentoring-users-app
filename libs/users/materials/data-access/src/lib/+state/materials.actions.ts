import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IAddMaterial, IMaterial } from '../models/material.model';
import { IFolder } from '../models/folder.model';
import { HttpErrorResponse } from '@angular/common/http';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Load Materials Folders': emptyProps(),
    'Load Materials Folders Success': props<{ folders: IFolder[] }>(),
    'Load Materials Folders Failure': props<{ error: HttpErrorResponse | null }>(),

    'Add Materials Folder': props<{ title: string }>(),
    'Add Materials Folder Success': props<{ folder: IFolder }>(),
    'Add Materials Folder Failure': props<{ error: HttpErrorResponse | null }>(),

    'Delete Materials Folder': props<{ folderId: number }>(),
    'Delete Materials Folder Success': props<{ folderId: number }>(),
    'Delete Materials Folder Failure': props<{ error: HttpErrorResponse | null }>(),

    'Load Materials': emptyProps(),
    'Load Materials Success': props<{ materials: IMaterial[] }>(),
    'Load Materials Failure': props<{ error: HttpErrorResponse | null }>(),

    'Add Materials': props<{ materials: IAddMaterial }>(),
    'Add Materials Success': props<{ materials: IMaterial }>(),
    'Add Materials Failure': props<{ error: HttpErrorResponse | null }>(),

    'Delete Material': props<{ id: number }>(),
    'Delete Materials Success': props<{ id: number }>(),
    'Delete Materials Failure': props<{ error: HttpErrorResponse | null }>(),
  },
});
