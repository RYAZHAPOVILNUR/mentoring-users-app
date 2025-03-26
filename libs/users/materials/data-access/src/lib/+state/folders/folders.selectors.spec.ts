import * as fromFolders from './folders.reducer';
import { selectFoldersState } from './folders.selectors';

describe('Folders Selectors', () => {
  it('should select the feature state', () => {
    const result = selectFoldersState({
      [fromFolders.foldersFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
