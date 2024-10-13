import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { LoadingStatus } from '../../models/loading-status.enum';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IFolder } from '../../models/folder.interface';
import { IMaterial } from '../../models/material.interface';

// export const MATERIALS_FEATURE_KEY = 'materials';

export type FolderState = EntityState<IFolder>
export type MaterialState = EntityState<IMaterial>

export const materialsAdapter: EntityAdapter<IMaterial> = createEntityAdapter<IMaterial>();
export const foldersAdapter: EntityAdapter<IFolder> = createEntityAdapter<IFolder>();

export interface MaterialsState {
  folders: FolderState;
  materials: MaterialState;
  status: LoadingStatus;
  error: Error | null;
}

export const initialMaterialsState: MaterialsState = {
  folders: foldersAdapter.getInitialState(),
  materials: materialsAdapter.getInitialState(),
  status: LoadingStatus.Init,
  error: null
};

export const materialsFeature = createFeature({
  name: 'materials',
  reducer: createReducer(
    initialMaterialsState,
    on(MaterialsActions.loadFolders, (state) => ({
        ...state,
        status: LoadingStatus.Loading
      }
    )),
    on(MaterialsActions.loadFoldersSuccess, (state, action) => ({
        ...state,
        folders: foldersAdapter.setAll(action.folders, state.folders),
        status: LoadingStatus.Loaded
      }
    )),
    on(MaterialsActions.loadFoldersFailure, (state, action) => ({
        ...state,
        status: LoadingStatus.Error,
        error: action.error
      }
    )),
    on(MaterialsActions.createFolderSuccess, (state, { folder }) => ({
        ...state,
        folders: foldersAdapter.addOne(folder, state.folders)
      }
    )),
    on(MaterialsActions.createFolderFailure, (state, action) => ({
        ...state,
        status: LoadingStatus.Error,
        error: action.error
      }
    ))
  )
});

