import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { CreateMaterial, Material } from '../interface/materials.interface';

export const MaterialsActions = createActionGroup({
  source: 'Materials Page',
  events: {
    loadMaterials: emptyProps(),
    loadMaterialsSuccess: props<{ materials: Material[] }>(),
    loadMaterialsFailure: props<{ error: HttpErrorResponse }>(),

    addMaterial: props<{ material: CreateMaterial }>(),
    addMaterialSuccess: props<{ material: Material }>(),
    addMaterialFailure: props<{ error: HttpErrorResponse }>(),

    deleteMaterial: props<{ id: number }>(),
    deleteMaterialSuccess: props<{ id: number }>(),
    deleteMaterialFailure: props<{ error: HttpErrorResponse }>(),
  },
});
