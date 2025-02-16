import { createReducer, on } from '@ngrx/store';
import * as FoldersActions from './folders.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { FoldersEntity } from '../../folders-dto/folders.entity';

export const FOLDERS_FEATURE_KEY = 'folders';

export type LoadingStatus = 'init' | 'loading' | 'loaded' | 'error';

export type FoldersErrors = {
  status: number;
  [key: string]: unknown;
};

export interface FoldersState extends EntityState<FoldersEntity> {
  selectedId?: string | number;
  status: LoadingStatus;
  errors: FoldersErrors | null;
  foldersFilter: { title: string };
}

export interface FoldersPortailState {
  readonly [FOLDERS_FEATURE_KEY]: FoldersState;
}

export const foldersAdapter: EntityAdapter<FoldersEntity> = createEntityAdapter<FoldersEntity>();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  status: 'init',
  errors: null,
  foldersFilter: { title: '' },
});

export const reducer = createReducer(
  initialFoldersState,
  on(FoldersActions.initFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(FoldersActions.loadFoldersSuccess, (state, { folders }) =>
    foldersAdapter.setAll(folders, { ...state, status: 'loaded' as const })
  ),
  on(FoldersActions.loadFolderFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  }))
);
