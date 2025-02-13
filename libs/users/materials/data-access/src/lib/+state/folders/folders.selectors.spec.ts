import * as fromMaterials from './folders.reducer';
import { selectMaterialsState } from './folders.selectors';

describe('Folders Selectors', () => {
  it('should select the feature state', () => {
    const result = selectMaterialsState({
      [fromMaterials.materialsFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
