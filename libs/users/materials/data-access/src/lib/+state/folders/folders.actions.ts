import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { AddFoldersType, FoldersType } from "../../models/folder.type";
import { FoldersErrors } from "./folders.reducer";

export const FoldersActions = createActionGroup({
  source: 'Folders',
  events: {
    initFolders: emptyProps(),
    loadFoldersSuccess: props<{ folders: FoldersType[] }>(),
    loadFoldersFailure: props<{ error: FoldersErrors }>(),

    addFolder: props<{ folder: AddFoldersType }>(),
    addFolderSuccess: props<{ folder: FoldersType }>(),
    addFolderFailed: props<{ error: FoldersErrors }>(),

    deleteFolder: props<{ id: number }>(),
    deleteFolderSuccess: props<{ id: number }>(),
    deleteFolderFailed: props<{ error: FoldersErrors }>(),
  },
});