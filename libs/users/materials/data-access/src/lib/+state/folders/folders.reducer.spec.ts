import { Action } from '@ngrx/store';

import * as FoldersActions from './folders.actions';
import { FoldersEntity } from './folders.models';
import { FoldersState, initialFoldersState, foldersReducer } from './folders.reducer';

describe('Folders Reducer', () => {
  const createFoldersEntity = (id: string, name = ''): FoldersEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Folders actions', () => {
    it('loadFoldersSuccess should return the list of known Folders', () => {
      const folders = [createFoldersEntity('PRODUCT-AAA'), createFoldersEntity('PRODUCT-zzz')];
      const action = FoldersActions.loadFoldersSuccess({ folders });

      const result: FoldersState = foldersReducer(initialFoldersState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = foldersReducer(initialFoldersState, action);

      expect(result).toBe(initialFoldersState);
    });
  });
});
