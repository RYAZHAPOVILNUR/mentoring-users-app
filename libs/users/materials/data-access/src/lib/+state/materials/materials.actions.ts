import { createAction, props } from "@ngrx/store"
import { MaterialType } from '@users/settings/data-access'

export const loadMaterials = createAction('[Materials] load materials')
export const loadMaterialsSuccess = createAction('[Materials] load material success', props<{ list: MaterialType[] }>())
export const loadMaterialsFail = createAction('[Materials] load material fail', props<{ errormessage: string }>())

export const addMaterial = createAction('[Materials] add material', props<{ inputdata: MaterialType }>())
export const addMaterialSuccess = createAction('[Materials] add material success', props<{ inputdata: MaterialType }>())

export const deleteMaterial = createAction('[Materials] delete material', props<{ id: number }>())
export const deleteMaterialSuccess = createAction('[Materials] delete material success', props<{ id: number }>())

export const loadMaterial = createAction('[Materials] get material', props<{ id: number }>())
export const loadMaterialSuccess = createAction('[Materials] get material success', props<{ list: MaterialType }>())


export const showAlertMaterials = createAction('[Materials] show alert', props<{ message: string, resptype: string }>())
export const emptyActionMaterials = createAction('emptyaction')