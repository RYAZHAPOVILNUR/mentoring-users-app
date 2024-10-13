import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  foldersAdapter,
  // MATERIALS_FEATURE_KEY,
  materialsAdapter,
  materialsFeature,
  MaterialsState
} from './materials.reducer';
import { FoldersListVM } from '@users/materials/feature-folders-list';
import { error } from 'ng-packagr/lib/utils/log';

export const selectMaterials = createSelector(
  materialsFeature.selectMaterialsState,
  (state) => state.materials
);
export const selectAllMaterials = createSelector(
  selectMaterials,
  (state) => Object.values(state.entities)
);
// Селектор для статуса и ошибки
export const selectMaterialStatus = createSelector(
  materialsFeature.selectMaterialsState,
  (state) => state.status
);

export const selectMaterialError = createSelector(
  materialsFeature.selectMaterialsState,
  (state) => state.error
);

// Селектор для состояния папок и всех папок
export const selectFolders = createSelector(
  materialsFeature.selectMaterialsState,
  (state) => state.folders
);

export const selectAllFolders = createSelector(
  selectFolders,
  (state) => Object.values(state.entities)
);
// Селектор для создания объекта FolderListVm
export const selectFolderListVm = createSelector(
  selectAllFolders,
  selectMaterialStatus,
  selectMaterialError,
  (folders, status, error) => ({
    folders,
    status,
    error
  })
);

// export const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);
//
// const {selectAll} = materialsAdapter.getSelectors()

// export const selectAllFolders = createSelector(selectMaterials, (state: MaterialsState) => selectAll(state))
//
// export const selectLoadingStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status)


// // Селектор для состояния материалов
// export const selectMaterialState = createSelector(
//   materialsFeature.selectMaterialsState,
//   (state) => state.materials
// );
//
// // Селектор для всех материалов
// export const selectAllMaterials = createSelector(
//   selectMaterialState,
//   (state) => state.entities
// );
//
// // Селектор для статуса
// export const selectMaterialStatus = createSelector(
//   materialsFeature.selectMaterialsState,
//   (state) => state.status
// );
//
// // Селектор для ошибки
// export const selectMaterialError = createSelector(
//   materialsFeature.selectMaterialsState,
//   (state) => state.error
// );
//
// // Селектор для состояния папок
// export const selectFolderState = createSelector(
//   materialsFeature.selectMaterialsState,
//   (state) => state.folders
// );
//
// // Селектор для всех папок
// export const selectAllFolders = createSelector(
//   selectFolderState,
//   (state) => state.entities
// )
