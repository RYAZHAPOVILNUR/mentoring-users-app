import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { Folder } from '../models/folder.model';
import { EntityState } from '@ngrx/entity';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsFeatureState extends EntityState<Folder> {
  folders: Folder[];
}

export const initialMaterialsState: MaterialsFeatureState = {
  folders: [],
};

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: createReducer(
    initialMaterialsState,
    on(MaterialsActions.loadFolders, (state) => state),
    on(MaterialsActions.loadFoldersSuccess, (state, action) => state),
    on(MaterialsActions.loadFoldersFailure, (state, action) => state)
  ),
});
