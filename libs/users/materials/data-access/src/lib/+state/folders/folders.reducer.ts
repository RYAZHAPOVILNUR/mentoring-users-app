import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from "@ngrx/store";
import { TFolderDTO } from '../../models/folders/folder-data.models';
import { foldersActions } from "./folders.actions";
import { LoadingStatus } from '@users/core/data-access';

export type TFoldersError = {
  status: number;
  [key: string]: unknown;
};

export interface IFoldersState extends EntityState<TFolderDTO> {
  status: LoadingStatus;
  error: TFoldersError | null
}

export const foldersAdapter: EntityAdapter<TFolderDTO> = createEntityAdapter<TFolderDTO>();

export const initialFoldersState: IFoldersState = foldersAdapter.getInitialState({
  status: 'init',
  error: null,
});

export const reducer = createReducer(
  initialFoldersState,
  // Load Folders
  on(foldersActions.loadFolders, (state) => ({ ...state, status: 'loading' as const })),
  on(foldersActions.loadFoldersSuccess, (state, { folders }) => foldersAdapter.setAll(folders, { ...state, status: 'loaded' as const })),
  on(foldersActions.loadFoldersFailure, (state, { error }) => ({ ...state, status: 'error' as const, error })),
  // Create Folder
  on(foldersActions.createFolder, (state) => ({ ...state, status: 'loading' as const })),
  on(foldersActions.createFolderSuccess, (state, { folder }) => foldersAdapter.addOne(folder, { ...state, status: 'loaded' as const })),
  on(foldersActions.createFolderFailure, (state, { error }) => ({ ...state, status: 'error' as const, error })),
  // Delete Folder
  on(foldersActions.deleteFolder, (state) => ({ ...state, status: 'loading' as const })),
  on(foldersActions.deleteFolderSuccess, (state, { id }) => foldersAdapter.removeOne(id, { ...state, status: 'loaded' as const })),
  on(foldersActions.deleteFolderFailure, (state, { error }) => ({ ...state, status: 'error' as const, error })),
);
