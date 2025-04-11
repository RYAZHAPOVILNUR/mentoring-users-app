import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MaterialsErrors } from './models/material';
import { AddMaterialsEntity, MaterialsEntity } from '@users/core/data-access';

export const materialsActions = createActionGroup({
  source: 'Material Folders',
  events: {
    loadMaterials: emptyProps(),
    loadMaterialsSuccess: props<{ materials: MaterialsEntity[] }>(),
    loadMaterialsFailure: props<{ error: MaterialsErrors }>(),

    addMaterial: props<{ materialData: AddMaterialsEntity }>(),
    addMaterialSuccess: props<{ materialData: MaterialsEntity }>(),
    addMaterialFailure: props<{ error: MaterialsErrors }>(),

    deleteMaterial: props<{ materialId: number }>(),
    deleteMaterialSuccess: props<{ materialId: number }>(),
    deleteMaterialFailure: props<{ error: MaterialsErrors }>()
  }
});
