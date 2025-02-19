import { FoldersEntity } from '@users/core/data-access';
import { foldersAdapter, FoldersPartialState, initialFoldersState } from './folders.reducer';
import * as FoldersSelectors from './folders.selectors';

describe('Folders Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getFoldersId = (it: FoldersEntity) => it.id;
  const createFoldersEntity = (id: number) =>
    ({
      id,
      title: '',
      createdAt: 'df',
    } as FoldersEntity);

  let state: FoldersPartialState;

  beforeEach(() => {
    state = {
      folders: foldersAdapter.setAll([createFoldersEntity(3), createFoldersEntity(4), createFoldersEntity(6)], {
        ...initialFoldersState,
        title: '',
        createdAt: 'df',
        loaded: true,
      }),
    };
  });

  describe('Folders Selectors', () => {
    it('selectAllFolders() should return the list of Folders', () => {
      const results = FoldersSelectors.selectAllFolders(state);
      const selId = getFoldersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = FoldersSelectors.selectFoldEntity(state) as FoldersEntity;
      const selId = getFoldersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectFoldersLoaded() should return the current "loaded" status', () => {
      const result = FoldersSelectors.selectFoldersStatus(state);

      expect(result).toBe(true);
    });

    it('selectFoldersError() should return the current "error" state', () => {
      const result = FoldersSelectors.selectFoldersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
