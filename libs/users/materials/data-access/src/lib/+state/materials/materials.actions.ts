import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MaterialsEntity } from '@users/core/data-access';
import { MaterialsErrors } from './materials.models';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    initMaterials: emptyProps(),

    loadMaterialsSuccess: props<{ materials: MaterialsEntity[] }>(),
    loadMaterialsFailure: props<{ error: MaterialsErrors }>(),

    addMaterial: props<{ materialData: MaterialsEntity }>(),
    addMaterialSuccess: props<{ materialData: MaterialsEntity }>(),
    addMaterialFailed: props<{ error: MaterialsErrors }>(),

    deleteMaterial: props<{ id: number }>(),
    deleteMaterialSuccess: props<{ id: number }>(),
    deleteMaterialFailed: props<{ error: MaterialsErrors }>(),

    editMaterial: props<{ materialData: MaterialsEntity }>(),
    editMaterialSuccess: props<{ materialData: MaterialsEntity }>(),
    editMaterialFailed: props<{ error: MaterialsErrors | null }>(),

    getMaterialById: props<{ materialId: number }>(),
  },
});
