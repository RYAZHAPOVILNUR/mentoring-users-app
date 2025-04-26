import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MaterialsEntity } from '../../models/materials.models';
import { createMaterial } from '../../models/create-material.model';
import { materialFilter } from '../../models/material-filter.models';

export const materialActions = createActionGroup({
  source: 'Material',
  events: {
    loadMaterials: emptyProps(),
    loadMaterialsSuccess: props<{ materials: MaterialsEntity[] }>(),
    loadMaterialsFailed: props<{ error: Error }>(),

    addMaterial: props<{ materialData: createMaterial }>(),
    addMaterialSuccess: props<{ materialData: MaterialsEntity }>(),
    addMaterialFailed: props<{ error: Error }>(),

    deleteMaterial: props<{ id: number }>(),
    deleteMaterialSuccess: props<{ id: number }>(),
    deleteMaterialFailed: props<{ error: Error }>(),

    loadMaterial: emptyProps(),
    loadMaterialSuccess: props<{ material: MaterialsEntity }>(),
    loadMaterialFailed: props<{ error: Error }>(),

    setMaterialFilter: props<{ filter: materialFilter }>(),
  },
});
