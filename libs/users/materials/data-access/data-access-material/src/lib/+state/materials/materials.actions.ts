import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { CreateMaterial } from '../../interfaces/create-material.interface';
import { Material } from '../../interfaces/material.interface';
export const materialsActions = createActionGroup({
  source: 'Materials',
  events: {
    publishMaterial: props<{ material: CreateMaterial }>(),
    publishMaterialSuccess: props<{ material: Material }>(),
    publishMaterialFailed: props<{ error: HttpErrorResponse }>(),

    loadMaterials: emptyProps(),
    loadMaterialsSuccess: props<{ materials: Material[] }>(),
    loadMaterialsFailed: props<{ error: HttpErrorResponse }>(),

    getMaterialForView: props<{ materialId: number }>(),
    getMaterialForViewSuccess: props<{ materialId: number }>(),
    getMaterialForViewFailed: props<{ error: HttpErrorResponse }>(),

    deleteMaterial: props<{ materialId: number }>(),
    deleteMaterialSuccess: props<{ materialId: number }>(),
    deleteMaterialFailed: props<{ error: HttpErrorResponse }>(),
  },
});
