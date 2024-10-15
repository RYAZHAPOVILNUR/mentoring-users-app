import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LoadingStatus } from '../../models/loading-status.enum';
import { FoldersActions } from './folders.actions';
import { IFolder } from '../../models/folder.interface';


export interface FoldersState extends EntityState<IFolder> {
  folders: IFolder[];
  status: LoadingStatus;
  error: Error | null;
}

export const foldersAdapter: EntityAdapter<IFolder> = createEntityAdapter<IFolder>();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  folders: [],
  status: LoadingStatus.Init,
  error: null
});

export const foldersFeature = createFeature({
  name: 'folders',
  reducer: createReducer(
    initialFoldersState,
    on(FoldersActions.loadFolders, (state) => ({
        ...state,
        status: LoadingStatus.Loading
      }
    )),
    on(FoldersActions.loadFoldersSuccess, (state, { folders }) => ({
      ...state,
      folders: folders
    })),
    on(FoldersActions.loadFoldersFailure, (state, action) => ({
        ...state,
        status: LoadingStatus.Error,
        error: action.error
      }
    )),
    on(FoldersActions.deleteFolder, (state) => ({
      ...state,
      status: LoadingStatus.Loading,
      error: null
    })),
    on(FoldersActions.deleteFolderSuccess, (state, { folderId }) => ({
      ...state,
      folders: state.folders.filter(folder => folder.id !== folderId),
      status: LoadingStatus.Loaded,
      error: null
    })),
    on(FoldersActions.deleteFolderFailure, (state, action) => ({
      ...state,
      error: action.error
    })),
    on(FoldersActions.addFolder, (state, { folder }) => ({
      ...state,
      folders: [...state.folders, folder]
    })),
    on(FoldersActions.addFolderSuccess, (state, { folder }) => ({
      ...state,
      folders: [...state.folders, folder]
    })),
    on(FoldersActions.addFolderFailure, (state, { error }) => ({
      ...state,
      error: error
    }))
  )
});
