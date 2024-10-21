import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LoadingStatus } from '@users/materials/data-access';
import { FoldersActions } from './folders.actions';

export interface FoldersEntity {
  id: number;
  created_at: string;
  title: string;
}
export interface FoldersState extends EntityState<FoldersEntity> {
  status: LoadingStatus;
  error: Error | null;
}

export const foldersAdapter: EntityAdapter<FoldersEntity> = createEntityAdapter<FoldersEntity>();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  status: 'init',
  error: null
});

export const foldersFeature = createFeature({
  name: 'folders',
  reducer: createReducer(
    initialFoldersState,
    on(FoldersActions.loadFolders, (state) => ({
        ...state,
        status: 'loading',
        error: null
      }
    )),
    on(FoldersActions.loadFoldersSuccess, (state, { folders }) =>
      foldersAdapter.setAll(folders, {
        ...state,
        status: 'loaded',
        error: null
      })
    ),
    on(FoldersActions.loadFoldersFailure, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error
      }
    )),
    on(FoldersActions.addFolder, (state) => ({
        ...state,
        status: 'loading',
        error: null
      })
    ),
    on(FoldersActions.addFolderSuccess, (state, { folder }) =>
      foldersAdapter.addOne(folder, {
        ...state,
        status: 'loaded',
        error: null
      })
    ),
    on(FoldersActions.addFolderFailure, (state, { error }) => ({
      ...state,
      status: 'error',
      error: error
    })),
    on(FoldersActions.deleteFolder, (state) => ({
      ...state,
      status: 'deleting',
      error: null
    })),
    on(FoldersActions.deleteFolderSuccess, (state, { folderId }) =>
      foldersAdapter.removeOne(folderId, {
          ...state,
          status: 'loaded',
          error: null
        }
      )
    ),
    on(FoldersActions.deleteFolderFailure, (state, { error }) => ({
      ...state,
      status: 'error',
      error: error
    }))
  )
});
