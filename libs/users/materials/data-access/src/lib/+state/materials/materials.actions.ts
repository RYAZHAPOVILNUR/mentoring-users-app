import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AddMaterialsType, MaterialsType } from '../../models/material.type';
import { MaterialsErrors } from './materials.reducer';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    initMaterials: emptyProps(),
    loadMaterialsSuccess: props<{ materials: MaterialsType[] }>(),
    loadMaterialsFailure: props<{ error: MaterialsErrors }>(),

    addMaterial: props<{ material: AddMaterialsType }>(),
    addMaterialSuccess: props<{ material: MaterialsType }>(),
    addMaterialFailed: props<{ error: MaterialsErrors }>(),

    deleteMaterial: props<{ id: number }>(),
    deleteMaterialSuccess: props<{ id: number }>(),
    deleteMaterialFailed: props<{ error: MaterialsErrors }>(),
  },
});
