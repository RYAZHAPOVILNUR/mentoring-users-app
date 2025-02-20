import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateMaterialsDTO } from '../../models/materials-dto.model';
import { MaterialsEntity } from '../../models/materials.entity';

export const materialsActions = createActionGroup({
  source: 'Materials',
  events: {
    initMaterials:  emptyProps(), // Экшен без payload
    loadMaterialsSuccess: props<{ materials: MaterialsEntity[] }>(), // Экшен с материалами
    loadMaterialsFailure: props<{ error: any }>(),

    addMaterials: props<{ materialData: CreateMaterialsDTO }>(),
    addMaterialsSuccess: props<{ material: MaterialsEntity }>(),
    addMaterialsFailure: props<{ error: any }>(),

    deleteMaterials: props<{ id: number }>(),
    deleteMaterialsSuccess: props<{ id: number }>(),
    deleteMaterialsFailure: props<{ error: any }>(),
  },
})

