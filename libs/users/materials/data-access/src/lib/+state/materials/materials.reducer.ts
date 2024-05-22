import { createReducer, on } from '@ngrx/store'
import { addMaterialSuccess, deleteMaterialSuccess, loadMaterialSuccess, loadMaterialsFail, loadMaterialsSuccess } from './materials.actions';
import { MaterialModel } from '@users/settings/data-access';

export const materialState: MaterialModel = {
  list: [],
  errormessage: '',
  material: {
    "title": '',
    "material_link": '',
    "folder_id": 0
  }
}

const materialReducer = createReducer(materialState,

  on(loadMaterialsSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      errormessage: '',
    };
  }),
  on(loadMaterialSuccess, (state, action) => {
    return {
      ...state,
      errormessage: '',
      material: action.list
    };
  }),

  on(loadMaterialsFail, (state, action) => {
    return {
      ...state,
      list: [],
      errormessage: action.errormessage
    }
  }),

  on(deleteMaterialSuccess, (state, action) => {
    const _newdate = state.list.filter(o => o.id != action.id)
    return {
      ...state,
      list: _newdate,
      errormessage: ''
    }
  }),

  on(addMaterialSuccess, (state, action) => {
    return {
      ...state,
      list: [...state.list, action.inputdata],
      errormessage: ''
    }
  })
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MaterialReducer(state: any, action: any) {
  return materialReducer(state, action)
}