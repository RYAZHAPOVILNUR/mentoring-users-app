import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AddFolderDTO, AddMaterialDTO, FolderDTO, MaterialDTO } from '../models/interfaces';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    'Init Folders': emptyProps(),
    'Init Folders Success': props<{ folders: FolderDTO[] }>(),
    'Init Folders Failure': props<{ error: unknown }>(),

    'Load Folder': props<{ folder: AddFolderDTO }>(),
    'Load Folder Success': props<{ folder: FolderDTO }>(),    
    
    'Delete Folder': props<{ folder: FolderDTO, openFn: () => void }>(),
    'Delete Folder Success': props<{ folder: FolderDTO }>(),
    
    'Init Files': emptyProps(),
    'Init Files Success': props<{ files: MaterialDTO[] }>(),
    'Init Files Failure': props<{ error: unknown }>(),
    
    'Load File': props<{ file: AddMaterialDTO }>(),
    'Load File Success': props<{ file: MaterialDTO }>(),

    'Delete File': props<{ file: MaterialDTO }>(),
    'Delete File Success': props<{ file: MaterialDTO }>(),   
  },
});
