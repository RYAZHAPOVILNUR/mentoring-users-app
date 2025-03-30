import { Action, createReducer, on } from '@ngrx/store';
import * as MaterialsActions from './materials.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LoadingStatus } from '@users/core/data-access';
import { FoldersEntity } from '../models/folders.entity';

export const MATERIALS_FEATURE_KEY = 'materials';

export type MaterialsErrors = {
  status: number;
  [key: string]: unknown;
};

export type FoldersErrors = {
  status: number;
  [key: string]: unknown;
}; 

export interface MaterialsState extends EntityState<FoldersEntity> {
  selectedId?: string | number;
  status: LoadingStatus;
  error: FoldersErrors | null;
}

export interface FoldersPartialState {
  readonly [MATERIALS_FEATURE_KEY]: MaterialsState;
}

export const materialsAdapter: EntityAdapter<FoldersEntity> = createEntityAdapter<FoldersEntity>()

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  error: null,

})

  const reducer = createReducer(
    initialMaterialsState,

    // folders
    on(MaterialsActions.initFolders, (state) => ({
      ...state, status: 'loading' as const
    })),
    on(MaterialsActions.loadFoldersSuccess, (state, { folders }) => 
      materialsAdapter.setAll(folders, { ...state, status: 'loaded' as const })
    ),
    on(MaterialsActions.loadFoldersFailure, (state, { error }) => ({
      ...state, status: 'error' as const, error
    })
    ),

    on(MaterialsActions.deleteFolderSuccess, (state, { id }) =>
      materialsAdapter.removeOne(id, { ...state })
    ),
    on(MaterialsActions.deleteFolderFailure, (state, { error }) => ({
      ...state, status: 'error' as const, error
    })
    ),

    on(MaterialsActions.addFolderSuccess, (state, { folderData }) =>
      materialsAdapter.addOne(folderData, {...state})
    ),
    on(MaterialsActions.addFolderFailure, (state, { error }) => ({
      ...state, status: 'error' as const, error
    })
    ),

    on(MaterialsActions.openFolder, (state) => ({
      ...state, status: 'loading' as const
    })
    ),
    on(MaterialsActions.openFolderSuccess, (state, { folder }) =>
      materialsAdapter.addOne({ ...folder }, { ...state, status: 'loaded' as const })
    ),
    on(MaterialsActions.openFolderFailure, (state, { error }) => ({
      ...state, status: 'error' as const, error
    })
    ),

    // materials
    on(MaterialsActions.loadMaterials, (state) => ({
      ...state, status: 'loading' as const
    })
    ),
    on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => ({
      ...state, materials, status: 'loaded' as const
    })
    ),
    on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
      ...state, status: 'error' as const, error
    })
    ),

    on(MaterialsActions.deleteMaterialSuccess, (state, { id }) =>
    materialsAdapter.removeOne(id, { ...state })
    ),
    on(MaterialsActions.deleteMaterialFailure, (state, { error }) => ({
      ...state, status: 'error' as const, error
    })
    ),

    // on(MaterialsActions.addMaterialSuccess, (state, { material }) => ({
    //   ...state, materials: [...state.materials, material]
    // })
    // ),

    on(MaterialsActions.addMaterialFailure, (state, { error }) => ({
      ...state, status: 'error' as const, error
    })
    ),
  )

  export function materialsReducer(state: MaterialsState | undefined, action: Action) {
    return reducer(state, action);
  }

