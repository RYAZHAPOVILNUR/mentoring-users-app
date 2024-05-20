import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Material } from '../../models/material.interface';
import { MaterialsErrors } from '../../models/material.type';

export const MaterialsActions = createActionGroup({
  source: '[Materials Material]',
  events: {
    loadMaterials: emptyProps(),
    loadMaterialsSuccess: props<{ materials: Material[] }>(),
    loadMaterialsFailed: props<{ error: MaterialsErrors }>(),

    createMaterial: props<{ title: string; material_link: string }>(),
    createMaterialSuccess: props<{ material: Material }>(),
    createMaterialFailed: props<{ error: MaterialsErrors }>(),

    deleteMaterial: props<{ id: number }>(),
    deleteMaterialSuccess: props<{ id: number }>(),
    deleteMaterialFailed: props<{ error: MaterialsErrors }>(),
  },
});

export const additionalActions = createActionGroup({
  source: 'additional',
  events: {
    ClearMaterials: emptyProps(),
  },
});
