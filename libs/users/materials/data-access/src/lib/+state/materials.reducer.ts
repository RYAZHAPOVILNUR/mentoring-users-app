import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { Folder } from '../model/folder.model';
import { LoadingStatus } from '@users/core/data-access';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export const materialsFeatureKey = 'materials';

export interface FolderState extends EntityState<Folder>{
  status: LoadingStatus
}

export const foldersAdapter: EntityAdapter<Folder> =
  createEntityAdapter<Folder>();

export const initialFolderState: FolderState = foldersAdapter.getInitialState({
  status: 'init'
});


export const foldersFeature = createFeature({
  name: 'folders',
  reducer : createReducer(
    initialFolderState,
  
    on(MaterialsActions.loadFolder, (state) => ({
      ...state,
      status:'loading' as const
    })),
  
    on(MaterialsActions.loadFolderSuccess, (state, { folders }) =>
      foldersAdapter.setAll(folders, { ...state, status: 'loaded' as const })
     ),
    on(MaterialsActions.loadFolderFailed, (state) => state),
  ),
});

