import { createAction, props } from "@ngrx/store"
import { FolderType } from '@users/settings/data-access'

export const loadFolders = createAction('[Folders] load folders')
export const loadFoldersSuccess = createAction('[Folders] load folders success', props<{ list: FolderType[] }>())
export const loadFoldersFail = createAction('[Folders] load folders fail', props<{ errormessage: string }>())

export const addFolder = createAction('[Folders] add folder', props<{ inputdata: string }>())
export const addFolderSuccess = createAction('[Folders] add folder success', props<{ inputdata: FolderType }>())

export const deleteFolder = createAction('[Folders] delete folder', props<{ id: number }>())
export const deleteFolderSuccess = createAction('[Folders] delete folder success', props<{ id: number }>())

export const getFolder = createAction('[Folders] get folder', props<{ id: number }>())
export const getFolderSuccess = createAction('[Folders] get folder success', props<{ obj: FolderType }>())

export const showAlertFolder = createAction('[Folders] show alert', props<{ message: string, resptype: string }>())
export const emptyActionFolder = createAction('emptyaction')

