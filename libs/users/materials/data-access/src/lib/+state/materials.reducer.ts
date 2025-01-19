import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { LoadingStatus } from '@users/core/data-access';
import * as MaterialsActions from '../+state/materials.actions';
import { IFolder } from '../models/folder.model';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<IFolder> {
  selectedId?: string | number;
  status: LoadingStatus;
  error: string | null;
}

export const materialsAdapter: EntityAdapter<IFolder> = createEntityAdapter<IFolder>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  error: null,
});

export interface MaterialsPartialState {
  readonly [MATERIALS_FEATURE_KEY]: MaterialsState;
}

export const reducer = createReducer(
  initialMaterialsState,
  on(MaterialsActions.addFolder, (state) => ({ ...state, loading: 'loading' as const })),
  on(MaterialsActions.addFolderSuccess, (state, { folder }) =>
    materialsAdapter.addOne({ ...folder }, { ...state, loading: 'loaded' as const })
  ),
  on(MaterialsActions.addFolderFailed, (state, { error }) => ({ ...state, status: 'error' as const, error }))
);

export function materialsReducer(state: MaterialsState | undefined, action: Action) {
  return reducer(state, action);
}
