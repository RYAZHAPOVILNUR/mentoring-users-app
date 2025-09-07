import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { LoadingStatus } from '@shared/util-store';

import { foldersActions } from './folders.actions';
import { Folder } from '../interfaces/folder.interface';

export const FOLDER_FEATURE_KEY = 'folders';

export interface FoldersState extends EntityState<Folder> {
  publishStatus: LoadingStatus;
}

export const foldersAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>({});

const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
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

    on(foldersActions.loadFolders, (state) => ({ ...state, publishStatus: 'loading' as const })),
    on(foldersActions.loadFoldersSuccess, (state, { folders }) =>
      foldersAdapter.setAll(folders, { ...state, publishStatus: 'loaded' as const }),
    ),
    on(foldersActions.loadFoldersFailed, (state) => ({ ...state, publishStatus: 'error' as const })),

    on(foldersActions.getFolderForMaterials, (state) => ({ ...state, publishStatus: 'loading' as const })),
    on(foldersActions.getFolderForMaterialsSuccess, (state, { folder }) =>
      foldersAdapter.upsertOne(folder, {
        ...state,
        status: 'loaded' as const,
      }),
    ),

    on(foldersActions.getFolderForMaterialsFailed, (state) => ({ ...state, publishStatus: 'error' as const })),

    on(foldersActions.deleteFolder, (state) => ({ ...state, publishStatus: 'loading' as const })),
    on(foldersActions.deleteFolderSuccess, (state, { folderId }) =>
      foldersAdapter.removeOne(folderId, {
        ...state,
        publishStatus: 'loaded' as const,
      }),
    ),
    on(foldersActions.deleteFolderFailed, (state) => ({ ...state, publishStatus: 'error' as const })),
  ),
});
