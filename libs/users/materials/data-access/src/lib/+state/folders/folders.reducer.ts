import { createReducer, on, Action, State } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IFolder } from '../../models/folders/folders.models';
import { LoadingStatus } from '@users/core/data-access';
import * as FoldersActions from "./folders.actions";
import { IAddFolder } from '../../models/folders/folders-add.model';
// import { FoldersActions } from './folders.actions';

export const FOLDERS_FEATURE_KEY = 'folders';


export type FoldersErrors = {
    status: number;
    [key: string]: unknown;
  };

  export interface FoldersState extends EntityState<IFolder> {
    folders: IFolder[];
    selectedId?: string | number;
    status: LoadingStatus;
    error: FoldersErrors | null;
  }


  export const foldersAdapter: EntityAdapter<IFolder> = createEntityAdapter<IFolder>();


// export interface FoldersState extends EntityState<IAddFolder> {
//     selectedId?: string | number; // which Users record has been selected
//     error: FoldersErrors | null;
//   }
  
  

  // export const FoldersAdapter: EntityAdapter<IAddFolder> = createEntityAdapter<IAddFolder>();
  export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
    folders: [], // если используешь это поле
    status: 'init',
    error: null,
  });
  

  export const reducer = createReducer(
    initialFoldersState,
    on(FoldersActions.initFolders, (state) => ({ ...state, status: 'loading' as const })),
    on(FoldersActions.loadFoldersSuccess, (state, { folders }) =>
      foldersAdapter.setAll(folders, { ...state, status: 'loaded' as const })
    ),
    on(FoldersActions.loadFoldersFailed, (state, { error }) => ({ ...state, status: 'error' as const, error })),
    on(FoldersActions.addFolderSuccess, (state, { folder }) =>
      foldersAdapter.addOne({ ...folder }, { ...state, status: 'loaded' as const })
    ),
    on(FoldersActions.addFolderFailed, (state, { error }) => ({ ...state, status: 'error' as const, error })),
    on(FoldersActions.loadFolder, (state) => ({ ...state, status: 'loading' as const })),
    on(FoldersActions.loadFolderSuccess, (state, { folder }) =>
      foldersAdapter.addOne({ ...folder }, { ...state, status: 'loaded' as const })
    ),
    on(FoldersActions.loadFolderFailed, (state, { error }) => ({ ...state, status: 'error' as const, error })),

  )

export function materialsReducer(state: FoldersState | undefined, action: Action) {
  return reducer(state, action);
}



