import * as fromMaterials from './materials.reducer';
import { selectMaterialsState } from './materials.selectors';

describe('Materials Selectors', () => {
  it('should select the feature state', () => {
    const result = selectMaterialsState({
      [fromMaterials.MATERIALS_FEATURE_KEY]: {}
    });

    expect(result).toEqual({});
  });
});
