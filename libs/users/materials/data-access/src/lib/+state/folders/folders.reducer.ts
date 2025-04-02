import { createReducer, on } from '@ngrx/store';
import * as FoldersActions from './folders.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { FoldersEntity } from '../../folders-dto/folders.entity';
import { LoadingStatus } from '@users/core/data-access';

export const FOLDERS_FEATURE_KEY = 'folders';

export type FoldersErrors = {
  status: number;
  [key: string]: unknown;
};
// Интерфейс состояния папок
export interface FoldersState extends EntityState<FoldersEntity> {
  selectedId?: string | number;
  status: LoadingStatus;
  errors: FoldersErrors | null;
  foldersFilter: { title: string };
}
// Начальное состояние
export interface FoldersPortailState {
  readonly [FOLDERS_FEATURE_KEY]: FoldersState;
}
// Создаем адаптер для управления коллекцией папок
export const foldersAdapter: EntityAdapter<FoldersEntity> = createEntityAdapter<FoldersEntity>();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  status: 'init',
  errors: null,
  foldersFilter: { title: '' },
});
// Reducer (управляет состоянием)
export const foldersReducer = createReducer(
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
  // on(FoldersActions.addFolder, (state, { folderData }) => foldersAdapter.addOne(folderData, { ...state })),
  on(FoldersActions.loadFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FoldersActions.loadFolderSuccess, (state, { folderData }) =>
    foldersAdapter.addOne({ ...folderData }, { ...state, status: 'loaded' as const })
  ),
  on(FoldersActions.updateFolderStatus, (state, { status }) => ({
    ...state,
    status,
  })),
  on(FoldersActions.deleteFolderSuccess, (state, { id }) => foldersAdapter.removeOne(id, { ...state })),
  on(FoldersActions.editFolderFailed, (state, { error }) => ({ ...state, status: 'error' as const, error }))
);
