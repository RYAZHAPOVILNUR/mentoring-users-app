import * as fromMaterials from './folders.reducer';
import { selectMaterialsState } from './folders.selectors';

describe('Materials Selectors', () => {
  it('should select the feature state', () => {
    const result = selectMaterialsState({
      [fromMaterials.materialsFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
