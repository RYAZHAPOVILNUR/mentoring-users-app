import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { FoldersActions } from './folders.actions';
import { FolderDTO, LoadingStatus } from '@users/core/data-access';

export const FOLDERS_FEATURE_KEY = 'folders';

export type FoldersErrors = {
  status: number;
  [key: string]: unknown;
};
export interface FoldersState extends EntityState<FolderDTO> {
  selectedId?: string | number; // which Users record has been selected
  status: LoadingStatus;
  error: FoldersErrors | null;
  activeFolder: FolderDTO | null;
}
export interface FoldersPartialState {
  readonly [FOLDERS_FEATURE_KEY]: FoldersState;
}
export const foldersAdapter: EntityAdapter<FolderDTO> = createEntityAdapter<FolderDTO>();
export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
    error: null,
    status: 'init',
    activeFolder: null
  });

const reducer = createReducer(
  initialFoldersState,
  //________________________________Load Folders
  on(FoldersActions.initFolders, (state) => ({ ...state, status: 'loading' as const })),
  on(FoldersActions.loadFoldersSuccess, (state, { folders }) => foldersAdapter.setAll( folders, { ...state, status: 'loaded' as const })),
  on(FoldersActions.loadFoldersFailure, (state, {error}) => ({ ...state, status: 'error' as const, error })),
  //________________________________Add Folder
  on(FoldersActions.addFolder, (state) => ({ ...state, status: 'loading' as const })),
  on(FoldersActions.addFolderSuccess, (state, { folder }) => foldersAdapter.addOne( folder, { ...state, status: 'loaded' as const })),
  on(FoldersActions.addFolderFailure, (state, {error}) => ({ ...state, status: 'error' as const, error })),
  //________________________________Remove Folder
  on(FoldersActions.removeFolder, (state) => ({ ...state, status: 'loading' as const })),
  on(FoldersActions.removeFolderSuccess, (state, { id }) => foldersAdapter.removeOne( id, { ...state, status: 'loaded' as const })),
  on(FoldersActions.removeFolderFailure, (state, {error}) => ({ ...state, status: 'error' as const, error })),
  //________________________________Get Folder
  on(FoldersActions.getFolder, (state) => ({ ...state, status: 'loading' as const })),
  on(FoldersActions.getFolderSuccess, (state, { folder }) => ({ ...state, status: 'loaded' as const, activeFolder: folder })),
  on(FoldersActions.getFolderFailure, (state, {error}) => ({ ...state, status: 'error' as const, error })),

);

export function foldersReducer(
  state: FoldersState | undefined,
  action: Action
) {
  return reducer(state, action);
}
