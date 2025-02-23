import { Action } from '@ngrx/store';

import * as MaterialsActions from './materials.actions';
import { MaterialsEntity } from './materials.models';
import { MaterialsState, initialMaterialsState, materialsReducer } from './materials.reducer';

describe('Materials Reducer', () => {
  const createMaterialsEntity = (id: string, name = ''): MaterialsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Materials actions', () => {
    it('loadMaterialsSuccess should return the list of known Materials', () => {
      const materials = [createMaterialsEntity('PRODUCT-AAA'), createMaterialsEntity('PRODUCT-zzz')];
      const action = MaterialsActions.loadMaterialsSuccess({ materials });

      const result: MaterialsState = materialsReducer(initialMaterialsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = materialsReducer(initialMaterialsState, action);

      expect(result).toBe(initialMaterialsState);
    });
  });
});
