import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { MaterialDTO, CreateMaterialDTO, MaterialEntity } from "@users/core/data-access";
import { onSuccessEditionCbType } from "@users/materials/data-access";

export const UserMaterialActions = createActionGroup({
  source: 'User Materials',
  events: {
    'Init Materials': emptyProps(),
    'Load Materials Success': props<{ materials: MaterialEntity[] }>(),
    'Load Materials Failure': props<{ error: any }>(),
    'Add Material': props<{materialData: CreateMaterialDTO}>(),
    'Add Material Success': props<{materialData: MaterialEntity}>(),
    'Add Material Failure': props<{error: any}>(),
    'Edit Material': props<{materialData: MaterialEntity, id: number, onSuccess: onSuccessEditionCbType}>(),
    'Edit Material Success': props<{materialData: MaterialEntity}>(),
    'Edit Material Failure': props<{error: any}>(),
    'Delete Material': props<{id: number}>(),
    'Delete Material Success': props<{id: number}>(),
    'Delete Material Failure': props<{error: any}>(),
    'Load Material': emptyProps(),
    'Load Material Success': props<{materialData: MaterialEntity}>(),
    'Load Material Failure': props<{error: any}>(),
  }
})