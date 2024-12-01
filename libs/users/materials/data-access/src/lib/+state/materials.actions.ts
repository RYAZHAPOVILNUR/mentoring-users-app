import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AddMaterialDTO, MaterialDTO } from '../models/material.model';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    loadMaterials: emptyProps(),
    loadMaterialsSuccess: props<{ materials: MaterialDTO[] }>(),
    loadMaterialsFailure: props<{ error: Error }>(),

    addMaterial: props<{material: AddMaterialDTO}>(),
    addMaterialSuccess: props<{material: AddMaterialDTO}>(),
    addMaterialFailure: props<{error: Error}>(),

    deleteMaterial: props<{id: number}>(),
    deleteMaterialSuccess: props<{id: number}>(),
    deleteMaterialFailure: props<{error: Error}>(),

    loadMaterial: emptyProps(),
    loadMaterialSuccess: props<{materials:MaterialDTO}>(),
    loadMaterialFailure: props<{error: Error}>(),
  },
});
