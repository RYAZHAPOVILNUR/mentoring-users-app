import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { CreateMaterial, Material } from '../../interfaces/create-material.interface';

export const materialsActions = createActionGroup({
  source: 'Materials',
  events: {
    publishMaterial: props<{ material: CreateMaterial }>(),
    publishMaterialSuccess: props<{ material: Material }>(),
    publishMaterialFailed: props<{ error: Error }>(),

    loadMaterials: emptyProps(),
    loadMaterialsSuccess: props<{ materials: Material[] }>(),
    loadMaterialsFailed: props<{ error: Error }>(),

    getMaterialForView: props<{ material_id: number }>(),
    getMaterialForViewSuccess: props<{ material_id: number }>(),
    getMaterialForViewFailed: props<{ error: Error }>(),

    deleteMaterial: props<{ material_id: number }>(),
    deleteMaterialSuccess: props<{ material_id: number }>(),
    deleteMaterialFailed: props<{ error: Error }>(),
  },
});
