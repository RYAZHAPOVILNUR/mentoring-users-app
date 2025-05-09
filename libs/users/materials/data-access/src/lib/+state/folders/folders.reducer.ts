import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { FoldersType } from '../../models/folder.type';
import { LoadingStatus } from "@users/core/data-access";
import { Action, createReducer, on } from '@ngrx/store';
import { FoldersActions } from './folders.actions';

export const FOLDERS_FEATURE_KEY = 'folders';

export type FoldersErrors = {
  status: number;
  [key: string]: unknown;
};

export interface FoldersState extends EntityState<FoldersType> {
  selectedId?: string | number;
  status: LoadingStatus;
  error: FoldersErrors | null;
}

export interface FoldersPartialState {
  readonly [FOLDERS_FEATURE_KEY]: FoldersState;
} 

export const foldersAdapter: EntityAdapter<FoldersType> = createEntityAdapter<FoldersType>();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  status: 'init',
  error: null,
});

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
)

export function foldersReducer(state: FoldersState | undefined, action: Action) {
  return reducer(state, action);
}

