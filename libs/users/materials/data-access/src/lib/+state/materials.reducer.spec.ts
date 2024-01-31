import { materialsFeature, initialState } from './materials.reducer';

describe('Materials Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = materialsFeature(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
