import { createSelector } from '@ngrx/store';
import { materialsAdapter, materialsFeature, MaterialsState } from './materials.reducer';
import { selectOpenFolder } from '../folders/folders.selectors';
import { MaterialsVM, materialsVMAdapter } from '@users/materials';

const { selectAll } = materialsAdapter.getSelectors();

export const selectMaterialsByFolder = (folderId: number) => createSelector(
  materialsFeature.selectMaterialsState,
  (state: MaterialsState): MaterialsVM[] => selectAll(state)
    .filter(material => material.folder_id == folderId)
    .map(material => materialsVMAdapter.entityToVM(material))
);

export const selectMaterialStatus = createSelector(
  materialsFeature.selectMaterialsState,
  (state) => state.status
);
export const selectMaterialError = createSelector(
  materialsFeature.selectMaterialsState,
  (state) => state.error
);
// export const selectCurrentMaterial = createSelector(
//   selectMaterialsByFolder,
//   selectOpenFolder,
//   (materials, folder) =>
//     materials && folder ? materials.filter((material) => material.folder_id === fodler.id) : []
// );
