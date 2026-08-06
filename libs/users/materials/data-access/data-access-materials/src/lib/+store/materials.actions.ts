import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { CreateMaterial, Material } from '@users/ui-materials';

export const MaterialsActions = createActionGroup({
  source: 'Materials',
  events: {
    loadMaterials: emptyProps(),
    loadMaterialsSuccess: props<{ materials: Material[] }>(),
    loadMaterialsFailure: emptyProps(),
    deleteMaterial: props<{ id: Material['id'] }>(),
    deleteMaterialSuccess: props<{ id: Material['id'] }>(),
    deleteMaterialFailure: emptyProps(),
    createMaterial: props<{ material: CreateMaterialDTO }>(),
    createMaterialSuccess: props<{ material: Material }>(),
    createMaterialFailure: emptyProps(),
  },
});
