import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { MaterialEntity } from '../types/material-entity.type';
import { MaterialFormData } from '../types/material-form.type';

export const materialActions = createActionGroup({
  source: 'Materials',
  events: {
    addMaterial: props<{ material: MaterialFormData }>(),
    addMaterialSuccess: props<{ material: MaterialEntity }>(),
    adddMaterialFailed: props<{ error: HttpErrorResponse }>(),

    loadMaterials: emptyProps(),
    loadMaterialsSuccess: props<{ materials: MaterialEntity[] }>(),
    loadMaterialsFailed: props<{ error: HttpErrorResponse }>(),

    deleteMaterial: props<{ materialId: number }>(),
    deleteMaterialSuccess: props<{ materialId: number }>(),
    deleteMaterialFailed: props<{ error: HttpErrorResponse }>(),
  },
});
