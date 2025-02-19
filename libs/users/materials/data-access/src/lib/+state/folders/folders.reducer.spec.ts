import { Action } from '@ngrx/store';
import { FoldersActions } from './folders.actions';
import { FoldersEntity } from '@users/core/data-access';
import { FoldersState, initialFoldersState, foldersReducer } from './folders.reducer';

describe('Folders Reducer', () => {
  const createFoldersEntity = (id: number): FoldersEntity => ({
    id,
    title: '',
    createdAt: 'df',
  });

  describe('valid Folders actions', () => {
    it('loadFoldersSuccess should return the list of known Folders', () => {
      const folders = [createFoldersEntity(3), createFoldersEntity(3)];
      const action = FoldersActions.loadFoldersSuccess({ folders });

      const result: FoldersState = foldersReducer(initialFoldersState, action);

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
