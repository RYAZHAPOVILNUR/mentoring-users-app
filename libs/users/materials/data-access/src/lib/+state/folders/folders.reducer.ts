import { Action, createReducer, on } from '@ngrx/store';
import * as FolderAction from './folders.actions'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { FoldersDTO, LoadingStatus, UsersEntity } from '../../../../../../../core/data-access/src';
import { state } from '@angular/animations';


export const FoldersFeatureKey = 'folders';

export const foldersAdapter: EntityAdapter<FoldersDTO> = createEntityAdapter<FoldersDTO>();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  // set initial required properties
  status: 'init',
  error: null,
});

export interface FoldersState extends EntityState<FoldersDTO> {
  selectedId?: string | number; // which Users record has been selected
  status: LoadingStatus;
  error: string | null;
}


const reducerFolder = createReducer(
  initialFoldersState,
  on(FolderAction.initFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FolderAction.loadFoldersSuccess, (state, { folders }) => (
    foldersAdapter.setAll(folders, { ...state, status: 'loaded' as const })
  )),
  on(FolderAction.loadFoldersFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(FolderAction.addFolderSuccess, (state, { folder }) => (
    foldersAdapter.addOne({ ...folder }, { ...state })
  )),
  on(FolderAction.addFolderFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  }))
);


export function folderReducer(state: FoldersState | undefined, action: Action){
  return reducerFolder(state, action);
}
