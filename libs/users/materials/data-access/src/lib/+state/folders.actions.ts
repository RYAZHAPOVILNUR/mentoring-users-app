import { createAction, props } from '@ngrx/store';
import { FoldersEntity } from './folders.reducer';
import { CreateUserDTO, LoadingStatus, UsersDTO, UsersEntity } from '@users/core/data-access';

export type onSuccessEditionCbType = () => void;

export const initFolders = createAction('[Folders Page] Init Folders');
export const loadFoldersSuccess = createAction('[Folders/API] Load Folders Success', props<{ folders: FoldersEntity[] }>());
export const loadFoldersFailure = createAction('[Folders/API] Load Folders Failure', props<{ error: any }>());

