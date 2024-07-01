import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Folder } from '../../interfaces/folder.interface';
import { foldersActions } from './folders.actions';

export const FOLDERS_FEATURE_KEY = 'folders';
export const foldersSelector: EntityAdapter<Folder> = createEntityAdapter<Folder>();

const initialFoldersState = foldersSelector.getInitialState({
  status: 'init'
});

export const foldersFeature = createFeature({
  name: FOLDERS_FEATURE_KEY,
  reducer: createReducer(
    initialFoldersState,
    on(foldersActions.loadFolders, (state) => ({
        ...state,
        status: state.status === 'init' ? 'init' : 'loading'
      })
    ),
    on(foldersActions.loadFoldersSuccess, (state, { folders }) =>
      foldersSelector.setAll(folders, {
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
      foldersSelector.addOne(
        { ...folder },
        { ...state }
      )
    ),
    on(foldersActions.deleteFolderSuccess, (state, { id }) =>
      foldersSelector.removeOne(id, { ...state })
    )
  )
});







