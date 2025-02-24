import { Action, createReducer, on } from '@ngrx/store';
import { initialUsersState } from '../../../../../../users/data-access/src';
import * as FolderAction from './folders.actions'
import { LoadingStatus } from '../../../../../../../core/data-access/src';


export const FoldersFeatureKey = 'folders';

export interface FoldersState {
  status: string;
};

export const initialFoldersState = {
  status: 'init'
};

const reducerFolder = createReducer(
  initialFoldersState,
  on(FolderAction.initFolders, (state) => ({
    ...state,
    status: 'loading',
  }))
);


export function folderReducer(state: FoldersState | undefined, action: Action){
  return reducerFolder(state, action);
}
