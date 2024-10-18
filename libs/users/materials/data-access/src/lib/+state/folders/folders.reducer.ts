import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LoadingStatus } from '@users/materials/data-access';
import { FoldersActions } from './folders.actions';
import { IFolder } from '@users/materials/data-access';

export interface FoldersState extends EntityState<IFolder> {
  status: LoadingStatus;
  error: Error | null;
}

export const foldersAdapter: EntityAdapter<IFolder> = createEntityAdapter<IFolder>();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  status: LoadingStatus.Init,
  error: null
});

export const foldersFeature = createFeature({
  name: 'folders',
  reducer: createReducer(
    initialFoldersState,
    on(FoldersActions.loadFolders, (state) => ({
        ...state,
        status: LoadingStatus.Loading,
        error: null
      }
    )),
    on(FoldersActions.loadFoldersSuccess, (state, { folders }) =>
      foldersAdapter.setAll(folders, {
        ...state,
        status: LoadingStatus.Loaded,
        error: null
      })
    ),
    on(FoldersActions.loadFoldersFailure, (state, { error }) => ({
        ...state,
        status: LoadingStatus.Error,
        error: error
      }
    )),
    on(FoldersActions.addFolder, (state) => ({
        ...state,
        status: LoadingStatus.Loading,
        error: null
      })
    ),
    on(FoldersActions.addFolderSuccess, (state, { folder }) =>
      foldersAdapter.addOne(folder, {
        ...state,
        status: LoadingStatus.Loaded,
        error: null
      })
    ),
    on(FoldersActions.addFolderFailure, (state, { error }) => ({
      ...state,
      status: LoadingStatus.Error,
      error: error
    })),
    on(FoldersActions.deleteFolder, (state) => ({
      ...state,
      status: LoadingStatus.Deleting,
      error: null
    })),
    on(FoldersActions.deleteFolderSuccess, (state, { folderId }) =>
      foldersAdapter.removeOne(folderId, {
          ...state,
          status: LoadingStatus.Loaded,
          error: null
        }
      )
    ),
    on(FoldersActions.deleteFolderFailure, (state, { error }) => ({
      ...state,
      status: LoadingStatus.Error,
      error: error
    }))
  )
});
