import { createReducer, on } from '@ngrx/store'
import { addFolderSuccess, deleteFolderSuccess, loadFoldersFail, loadFoldersSuccess } from './folders.actions'
import { FolderModel } from '@users/settings/data-access';

export const folderState: FolderModel = {
  list: [],
  errormessage: ''
}

const folderReducer = createReducer(folderState,

  on(loadFoldersSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      errormessage: '',
    };
  }),

  on(loadFoldersFail, (state, action) => {
    return {
      ...state,
      list: [],
      errormessage: action.errormessage
    }
  }),

  on(deleteFolderSuccess, (state, action) => {
    const _newdate = state.list.filter((o: { id: number; }) => o.id != action.id)
    return {
      ...state,
      list: _newdate,
      errormessage: ''
    }
  }),

  on(addFolderSuccess, (state, action) => {
    return {
      ...state,
      list: [...state.list, action.inputdata],
      errormessage: ''
    }
  })
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FolderReducer(state: any, action: any) {
  return folderReducer(state, action)
}