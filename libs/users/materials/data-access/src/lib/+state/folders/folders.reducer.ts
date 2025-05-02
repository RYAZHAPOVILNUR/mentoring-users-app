import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { FoldersEntity } from "../../models/folders.entity";
import { LoadingStatus } from "@users/core/data-access";
import { Action, createReducer, on } from "@ngrx/store";
import * as FoldersActions from './folders.actions';

export const FOLDERS_FEATURE_KEY = 'folders';

export type FoldersErrors = {
  status: number;
  [key: string]: unknown;
}; 

export interface FoldersState extends EntityState<FoldersEntity> {
  selectedId?: string | number;
  status: LoadingStatus;
  error: FoldersErrors | null;
}

export interface FoldersPartialState {
  readonly [FOLDERS_FEATURE_KEY]: FoldersState;
} 

export const foldersAdapter: EntityAdapter<FoldersEntity> = createEntityAdapter<FoldersEntity>();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  status: 'init',
  error: null,
});

export function foldersReducer(state: FoldersState | undefined, action: Action) {
  return reducer(state, action);
}

const reducer = createReducer(

  initialFoldersState,

  on(FoldersActions.initFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FoldersActions.loadFoldersSuccess, (state, { folders }) =>
    foldersAdapter.setAll(folders, { ...state, status: 'loaded' as const })
  ),
  on(FoldersActions.loadFoldersFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(FoldersActions.deleteFolderSuccess, (state, { id }) => 
    foldersAdapter.removeOne(id, { ...state })
  ),
  on(FoldersActions.deleteFolderFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(FoldersActions.addFolderSuccess, (state, { folderData }) => {
    return foldersAdapter.addOne(folderData, { ...state });
  }),
  on(FoldersActions.addFolderFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  }))
  
);