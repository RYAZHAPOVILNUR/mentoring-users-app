// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import * as fromMaterials from './materials.reducer';

// export const selectMaterialsState = createFeatureSelector<fromMaterials.State>(fromMaterials.materialsFeatureKey);

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MaterialsStateInterface } from "../materials-state.interface";

export const selectFeature = (state: MaterialsStateInterface) => state;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state)=> state.status
);

export const foldersSelector = createSelector(
  selectFeature,
  (state)=> state.folders
);

export const errorSelector = createSelector(
  selectFeature,
  (state)=> state.error
);


export const MATERIALS_FEATURE_KEY = 'materials';

export const selectMaterialsState = createFeatureSelector<MaterialsStateInterface>(MATERIALS_FEATURE_KEY);

export const selectAllMaterials = createSelector(selectMaterialsState, (state: MaterialsStateInterface) => state);
