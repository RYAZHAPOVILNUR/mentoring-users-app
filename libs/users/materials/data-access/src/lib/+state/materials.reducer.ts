import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { Folder, Material } from '../models/materials.model';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { LoadingStatus } from '@users/core/data-access';

export const materialsFeatureKey = 'materials';

export interface State {}

export const initialState: State = {};

export interface MaterialsState extends EntityState<Folder> {
  materials: Material[];
  status: LoadingStatus;
}

export const materialsAdapter: EntityAdapter<Folder> =
  createEntityAdapter<Folder>();

export const initialMaterialsState: MaterialsState =
  materialsAdapter.getInitialState({
    materials: [],
    status: 'init',
  });


export const materialsFeature = createFeature({
  name: 'materials',
  reducer: createReducer(
    initialMaterialsState,
    //folders reducer 
    on(MaterialsActions.loadFolders, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(MaterialsActions.loadFoldersSuccess, (state, { folders }) =>
      materialsAdapter.setAll(folders, { ...state, status: 'loaded' as const })
    ),
    on(MaterialsActions.addFolderSuccess, (state, { newFolder }) =>
      materialsAdapter.addOne(
        { ...newFolder },
        { ...state, status: 'loaded' as const }
      )
    ),
    on(MaterialsActions.getFolderForRead, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(MaterialsActions.getFolderForReadSucces, (state, { folder }) =>
      materialsAdapter.addOne(
        { ...folder },
        { ...state, status: 'loaded' as const }
      )
    ),
    on(MaterialsActions.loadFoldersFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    on(MaterialsActions.deleteFolderSuccess, (state, { id }) =>
      materialsAdapter.removeOne(id, { ...state })
    ),

    // materials reducer 

    on(MaterialsActions.loadMaterials, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => ({
      ...state,
      materials,
      status: 'loaded' as const,
    })),

    on(MaterialsActions.addMaterialSuccess, (state, { newMaterial }) => ({
      ...state,
      materials: [...state.materials, newMaterial],
    })),

    on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => ({
      ...state,
      materials: state.materials.filter((mat) => mat.id !== id),
    }))
  ),
    
});

