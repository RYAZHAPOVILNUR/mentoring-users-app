import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { LoadingStatus } from '@shared/util-store';

import { folderActions } from './folder.actions';
import { FolderVM } from '../types/folder-vm.type';

export const FOLDER_FEATURE_KEY = 'folders';

export interface FolderState extends EntityState<FolderVM> {
  status: LoadingStatus;
}

export const foldersAdapter: EntityAdapter<FolderVM> = createEntityAdapter<FolderVM>({});

const initialFoldersState: FolderState = foldersAdapter.getInitialState({
  status: 'init',
});

export const folderFeature = createFeature({
  name: FOLDER_FEATURE_KEY,
  reducer: createReducer(
    initialFoldersState,
    on(folderActions.addFolder, (state) => ({
      ...state,
      status: 'loading' as const,
    })),

    on(folderActions.addFolderSuccess, (state, { folder }) =>
      foldersAdapter.addOne({ ...folder }, { ...state, status: 'loaded' as const }),
    ),
    on(folderActions.addFolderFailed, (state) => ({ ...state, status: 'error' as const })),

    on(folderActions.loadFolders, (state) => ({ ...state, status: 'loading' as const })),
    on(folderActions.loadFoldersSuccess, (state, { folders }) =>
      foldersAdapter.setAll(folders, { ...state, status: 'loaded' as const }),
    ),
    on(folderActions.loadFoldersFailed, (state) => ({ ...state, status: 'error' as const })),

    on(folderActions.loadFolderById, (state) => ({ ...state, status: 'loading' as const })),
    on(folderActions.loadFolderByIdSuccess, (state, { folder }) =>
      foldersAdapter.upsertOne(folder, {
        ...state,
        status: 'loaded' as const,
      }),
    ),

    on(folderActions.loadFolderByIdFailed, (state) => ({ ...state, status: 'error' as const })),

    on(folderActions.deleteFolder, (state) => ({ ...state, status: 'loading' as const })),
    on(folderActions.deleteFolderSuccess, (state, { folderId }) =>
      foldersAdapter.removeOne(folderId, {
        ...state,
        status: 'loaded' as const,
      }),
    ),
    on(folderActions.deleteFolderFailed, (state) => ({ ...state, status: 'error' as const })),
  ),
});
