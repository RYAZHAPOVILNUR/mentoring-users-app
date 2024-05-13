import { createActionGroup, emptyProps, props } from '@ngrx/store';;
import { FolderDTO } from '@users/core/data-access'

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Init Folders': emptyProps(),
    'Load Folders Success': props<{ folders: FolderDTO[] }>(),
    'Load Folders Failure': props<{ error: any }>()
    }
  } 
);


