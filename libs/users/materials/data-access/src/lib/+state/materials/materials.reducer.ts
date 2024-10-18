import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { LoadingStatus } from '../../models/loading-status.enum';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IMaterial } from '../../models/material.interface';
import { foldersAdapter } from '../folders/folders.reducer';

export const materialsAdapter: EntityAdapter<IMaterial> = createEntityAdapter<IMaterial>();

export interface MaterialsState extends EntityState<IMaterial> {
  status: LoadingStatus;
  error: Error | null;
}

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  status: LoadingStatus.Init,
  error: null
});

export const materialsFeature = createFeature({
  name: 'materials',
  reducer: createReducer(
    initialMaterialsState,
    on(MaterialsActions.loadMaterials, (state) => ({
        ...state,
        status: LoadingStatus.Loading,
        error: null
      }
    )),
    on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) =>
      materialsAdapter.setAll(materials, {
        ...state,
        status: LoadingStatus.Loaded,
        error: null
      })
    ),
    on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
        ...state,
        status: LoadingStatus.Error,
        error: error
      }
    )),
    on(MaterialsActions.addMaterial, (state) => ({
        ...state,
        status: LoadingStatus.Loading,
        error: null
      })
    ),
    on(MaterialsActions.addMaterialsSuccess, (state, { material }) =>
      materialsAdapter.addOne(material, {
        ...state,
        status: LoadingStatus.Loaded,
        error: null
      })
    ),
    on(MaterialsActions.addMaterialsFailure, (state, { error }) => ({
        ...state,
        status: LoadingStatus.Error,
        error: error
      }
    )),
    on(MaterialsActions.deleteMaterial, (state) => ({
      ...state,
      status: LoadingStatus.Deleting,
      error: null
    })),
    on(MaterialsActions.deleteMaterialsSuccess, (state, { materialId }) =>
      foldersAdapter.removeOne(materialId, {
          ...state,
          status: LoadingStatus.Loaded,
          error: null
        }
      )
    ),
    on(MaterialsActions.deleteMaterialsFailure, (state, { error }) => ({
      ...state,
      status: LoadingStatus.Error,
      error: error
    }))
  )
});
