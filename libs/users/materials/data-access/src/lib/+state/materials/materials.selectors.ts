import { createSelector } from '@ngrx/store';
import { materialsAdapter, materialsFeature, MaterialsState } from './materials.reducer';
// import { selectOpenFolder } from '../folders/folders.selectors';
import { MaterialsVM, materialsVMAdapter } from '@users/materials';
import { selectFolders } from '../folders/folders.selectors';

const { selectAll } = materialsAdapter.getSelectors();

export const selectMaterialsState = createSelector(
  materialsFeature.selectMaterialsState,
  (state: MaterialsState) => state
);
export const selectMaterialsByFolder = (folderId: number) => createSelector(
  selectMaterialsState,
  (state: MaterialsState): MaterialsVM[] => selectAll(state)
    .filter(material => material.folder_id == folderId)
    .map(material => materialsVMAdapter.entityToVM(material))
);
export const selectMaterialStatus = createSelector(
  selectMaterialsState,
  (state) => state.status
);
export const selectMaterialError = createSelector(
  selectMaterialsState,
  (state) => state.error
);
export const selectFolderNameById = (folderId: number) => createSelector(
  selectFolders,
  (folders) => folders.find(folder =>
    folder.id === folderId)?.title || null
);
export const selectMaterialPreviewById = (materialId: number) => createSelector(
  selectMaterialsState,
  (state: MaterialsState) => {
    const material = selectAll(state).find(material => material.id === materialId);
    return material ? material.preview || '' : '';
  }
)
// export const selectCurrentMaterial = createSelector(
//   selectMaterialsByFolder,
//   selectOpenFolder,
//   (materials, folder) =>
//     materials && folder ? materials.filter((material) => material.folder_id === fodler.id) : []
// );
