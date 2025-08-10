import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { LoadingStatus } from '@shared/util-store';

import { foldersActions } from './folders.actions';
import { Folder } from '../interfaces/create-folder.interface';

export const FOLDER_FEATURE_KEY = 'folders';

export interface FoldersState extends EntityState<Folder> {
  status: LoadingStatus;
  publishStatus: LoadingStatus;
}

export const foldersAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>({
  sortComparer: (a, b) => {
    return Number(a.created_at) - Number(b.created_at);
  },
});

const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  status: 'init',
  publishStatus: 'init',
});

export const foldersFeature = createFeature({
  name: FOLDER_FEATURE_KEY,
  reducer: createReducer(
    initialFoldersState,
    on(foldersActions.publishFolder, (state) => ({
      ...state,
      publishStatus: 'loading' as const,
    })),

    on(foldersActions.publishFolderSuccess, (state, { folder }) =>
      foldersAdapter.addOne({ ...folder }, { ...state, publishStatus: 'loaded' as const }),
    ),
    on(foldersActions.publishFolderFailed, (state) => ({ ...state, publishStatus: 'error' as const })),

    on(foldersActions.getFolderForMaterials, (state) => ({ ...state, status: 'loading' as const })),
    on(foldersActions.getFolderForMaterialsSuccess, (state, { folder }) =>
      foldersAdapter.upsertOne(folder, {
        ...state,
        status: 'loaded' as const,
      }),
    ),

    on(foldersActions.getFolderForMaterialsFailed, (state) => ({ ...state, status: 'error' as const })),

    on(foldersActions.loadFolders, (state) => ({ ...state, status: 'loading' as const })),
    on(foldersActions.loadFoldersSuccess, (state, { folders }) =>
      foldersAdapter.setAll(folders, { ...state, status: 'loaded' as const }),
    ),
    on(foldersActions.loadFoldersFailed, (state) => ({ ...state, status: 'error' as const })),

    on(foldersActions.deleteFolder, (state) => ({ ...state, publishStatus: 'loading' as const })),
    on(foldersActions.deleteFolderSuccess, (state, { folder_id }) =>
      foldersAdapter.removeOne(folder_id, {
        ...state,
        status: 'loaded' as const,
      }),
    ),
    on(foldersActions.deleteFolderFailed, (state) => ({ ...state, status: 'error' as const })),

    on(foldersActions.noCustomerFolder, (state) => ({ ...state, status: 'error' as const })),
  ),
});
