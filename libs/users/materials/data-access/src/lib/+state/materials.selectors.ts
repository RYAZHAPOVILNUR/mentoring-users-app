import { createSelector } from '@ngrx/store';
import { MaterialsState, materialsAdapter, materialsFeature } from './materials.reducer';


const { selectMaterialsState } = materialsFeature

const { selectAll } = materialsAdapter.getSelectors();

export const selectMaterials = createSelector(
  selectMaterialsState,
  (state: MaterialsState) => selectAll(state)
)