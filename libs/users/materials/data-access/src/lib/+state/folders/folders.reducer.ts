import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Folder } from '../../interfaces/folder.interface';
import { foldersActions } from './folders.actions';

export const FOLDERS_FEATURE_KEY = 'folders';
export const foldersAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>();
export const initialFoldersState = foldersAdapter.getInitialState({
  status: 'init'
});

export const foldersFeature = createFeature({
  name: FOLDERS_FEATURE_KEY,
  reducer: createReducer(
    initialFoldersState,
    on(foldersActions.loadFolders, (state) => ({
        ...state,
        status: 'loading'
      })
    ),
    on(foldersActions.loadFoldersSuccess, (state, { folders})=>
      foldersAdapter.setAll(folders, {
        ...state,
        status: 'loaded'
      })
    ),
    on(foldersActions.loadFoldersFailure, (state) => ({
        ...state,
        status: 'error'
      })
    ),
    on(foldersActions.createFolderSuccess, (state, { folder }) =>
      foldersAdapter.addOne(
        { ...folder },
        { ...state } // todo ИММУТАБЕЛЬНОСТЬ!
      )
    ),
    on(foldersActions.deleteFolderSuccess, (state, { id }) =>
      foldersAdapter.removeOne(id,{ ...state })
    ),
  )
});







