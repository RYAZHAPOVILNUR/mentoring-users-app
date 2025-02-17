import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import * as FoldersActions from './folders.actions';
import { LoadingStatus } from '@users/core/data-access';
import { FolderDTO } from '../models/folder-models';

export const FOLDERS_FEATURE_KEY = 'folders';

export type FoldersErrors = {
  status: number;
  [key: string]: unknown;
};

export interface FoldersState extends EntityState<FolderDTO> {
  folders: FolderDTO[];
  selectedId?: string | number;
  status: LoadingStatus;
  error: FoldersErrors | null;
}

export interface FoldersPartialState {
  readonly [FOLDERS_FEATURE_KEY]: FoldersState;
}

export const foldersAdapter: EntityAdapter<FolderDTO> = createEntityAdapter<FolderDTO>();


export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  folders: [],
  selectedId: undefined, 
  status: 'loading',
  error: null,
});

const reducer = createReducer(
  initialFoldersState,
  on(FoldersActions.loadFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FoldersActions.loadFoldersSuccess, (state, { folders }) => ({
    ...state,
    folders,
    error: null,
    status: 'loaded' as const,
  })),
  on(FoldersActions.loadFolderFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(FoldersActions.addFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FoldersActions.addFolderSuccess, (state, { folder }) => ({
    ...state,
    folders: [...state.folders, folder],
    error: null,
    status: 'loaded' as const,
  })),
  on(FoldersActions.addFolderFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(FoldersActions.deleteFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FoldersActions.deleteFolderSuccess, (state, { id }) => ({
    ...state,
    folders: state.folders.filter(folder => folder.id !== id),
    status: 'loaded' as const,
  })),  
  on(FoldersActions.deleteFolderFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(FoldersActions.openFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FoldersActions.openFolderSuccess, (state, { folder }) => ({
    ...state,
    selectedId: folder.id,
    error: null,
    status: 'loaded' as const,
  })),
  on(FoldersActions.openFolderFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
);

export function foldersReducer(state: FoldersState | undefined, action: Action) {
  return reducer(state, action);
}
