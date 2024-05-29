import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { TFolderDTO, TFolderCreate } from '../../models/folders/folder-data.models';
import { TFoldersError } from "./folders.reducer";

export const foldersActions = createActionGroup({
  source: 'Folders',
  events: {
    'LoadFolders': emptyProps(),
    'LoadFolders Success': props<{ folders: TFolderDTO[] }>(),
    'LoadFolders Failure': props<{ error: TFoldersError }>(),

    'Create Folder': props<{ folderTitle: TFolderCreate }>(),
    'Create Folder Success': props<{ folder: TFolderDTO }>(),
    'Create Folder Failure': props<{ error: TFoldersError }>(),

    'Delete Folder': props<{ folder: TFolderDTO }>(),
    'Delete Folder Success': props<{ id: number }>(),
    'Delete Folder Failure': props<{ error: TFoldersError }>(),
  },
});


