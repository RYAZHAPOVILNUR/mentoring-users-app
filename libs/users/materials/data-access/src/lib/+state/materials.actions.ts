import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateMaterialDTO, MaterialsDTO } from '../models/materials-dto.model';
import { CreateFolderDTO, FolderDTO } from '../models/folders-dto.models';
import { FolderEntity } from '../models/folders.entity';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    //Folder
    'Load Folders': emptyProps(),
    'Load Folders Success': props<{ folders: FolderEntity[] }>(),
    'Load Folders Failure': props<{ error: any }>(),
    'Add Folders': props<{ folder: CreateFolderDTO }>(),
    'Add Folders Success': props<{ newFolder: FolderDTO}>(),
    'Add Folders Failure': props<{ error: any }>(),
    'Delete Folder': props<{id: number}>(),
    'Delete Folder Success': props<{id: number}>(),
    'Delete Folder Failure': props<{error: any}>(),

    //Materials
    'Load Materialss': emptyProps(),
    'Load Materialss Success': props<{ materials: MaterialsDTO[] }>(),
    'Load Materialss Failure': props<{ error: any }>(),
    'Add Materialss': props<{ material: CreateMaterialDTO }>(), 
    'Add Materialss Success': props<{ newMaterial: MaterialsDTO}>(),
    'Add Materialss Failure': props<{ error: any }>(),
    'Delete Materialss': props<{id: number}>(),
    'Delete Materialss Success': props<{id: number}>(),
    'Delete Materialss Failure': props<{error: any}>(),
  }
});
