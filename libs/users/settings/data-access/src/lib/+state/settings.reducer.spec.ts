import { initialState, reducer } from './settings.reducer';

describe('Settings Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {};

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
