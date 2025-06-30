import { initialState, reducer } from './articles.reducer';

describe('Articles Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {};

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
