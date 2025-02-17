import { FoldersEntity } from './folders.models';
import { foldersAdapter, FoldersPartialState, initialFoldersState } from './folders.reducer';
import * as FoldersSelectors from './folders.selectors';

describe('Folders Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getFoldersId = (it: FoldersEntity) => it.id;
  const createFoldersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as FoldersEntity);

  let state: FoldersPartialState;

  beforeEach(() => {
    state = {
      folders: foldersAdapter.setAll(
        [createFoldersEntity('PRODUCT-AAA'), createFoldersEntity('PRODUCT-BBB'), createFoldersEntity('PRODUCT-CCC')],
        {
          ...initialFoldersState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
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
      const result = FoldersSelectors.selectEntity(state) as FoldersEntity;
      const selId = getFoldersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectFoldersLoaded() should return the current "loaded" status', () => {
      const result = FoldersSelectors.selectFoldersLoaded(state);

      expect(result).toBe(true);
    });

    it('selectFoldersError() should return the current "error" state', () => {
      const result = FoldersSelectors.selectFoldersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
