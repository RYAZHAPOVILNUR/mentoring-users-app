import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { LoadingStatus } from '@users/materials/data-access';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { foldersAdapter } from '../folders/folders.reducer';

export interface MaterialsEntity {
  id: number;
  created_at: string;
  title: string;
  material_link: string;
  folder_id: number;
}

export const materialsAdapter: EntityAdapter<MaterialsEntity> = createEntityAdapter<MaterialsEntity>();

export interface MaterialsState extends EntityState<MaterialsEntity> {
  status: LoadingStatus;
  error: Error | null;
}

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  error: null
});

export const materialsFeature = createFeature({
  name: 'materials',
  reducer: createReducer(
    initialMaterialsState,
    on(MaterialsActions.loadMaterials, (state) => ({
        ...state,
        status: 'loading',
        error: null
      }
    )),
    on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) =>
      materialsAdapter.setAll(materials, {
        ...state,
        status: 'loaded',
        error: null
      })
    ),
    on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error
      }
    )),
    on(MaterialsActions.addMaterial, (state) => ({
        ...state,
        status: 'loading',
        error: null
      })
    ),
    on(MaterialsActions.addMaterialsSuccess, (state, { material }) =>
      materialsAdapter.addOne(material, {
        ...state,
        status: 'loaded',
        error: null
      })
    ),
    on(MaterialsActions.addMaterialsFailure, (state, { error }) => ({
        ...state,
        status: 'error',
        error: error
      }
    )),
    on(MaterialsActions.deleteMaterial, (state) => ({
      ...state,
      status: 'deleting',
      error: null
    })),
    on(MaterialsActions.deleteMaterialsSuccess, (state, { materialId }) =>
      foldersAdapter.removeOne(materialId, {
          ...state,
          status: 'loaded',
          error: null
        }
      )
    ),
    on(MaterialsActions.deleteMaterialsFailure, (state, { error }) => ({
      ...state,
      status: 'error',
      error: error
    }))
  )
});
