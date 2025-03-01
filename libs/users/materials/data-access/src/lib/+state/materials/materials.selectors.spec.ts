import { MaterialsEntity } from './materials.models';
import { materialsAdapter, MaterialsPartialState, initialMaterialsState } from './materials.reducer';
import * as MaterialsSelectors from './materials.selectors';

describe('Materials Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getMaterialsId = (it: MaterialsEntity) => it.id;
  const createMaterialsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as MaterialsEntity);

  let state: MaterialsPartialState;

  beforeEach(() => {
    state = {
      materials: materialsAdapter.setAll(
        [createMaterialsEntity('PRODUCT-AAA'), createMaterialsEntity('PRODUCT-BBB'), createMaterialsEntity('PRODUCT-CCC')],
        {
          ...initialMaterialsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Materials Selectors', () => {
    it('selectAllMaterials() should return the list of Materials', () => {
      const results = MaterialsSelectors.selectAllMaterials(state);
      const selId = getMaterialsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = MaterialsSelectors.selectEntity(state) as MaterialsEntity;
      const selId = getMaterialsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectMaterialsLoaded() should return the current "loaded" status', () => {
      const result = MaterialsSelectors.selectMaterialsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectMaterialsError() should return the current "error" state', () => {
      const result = MaterialsSelectors.selectMaterialsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
