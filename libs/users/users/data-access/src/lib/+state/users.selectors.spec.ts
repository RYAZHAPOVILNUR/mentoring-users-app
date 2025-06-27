import { UsersEntity } from '@users/core/data-access';

import { initialUsersState, usersAdapter, UsersPartialState } from './users.reducer';
import * as UsersSelectors from './users.selectors';

describe('Users Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getUsersId = (it: UsersEntity) => it.id;
  const createUsersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    }) as UsersEntity;

  let state: UsersPartialState;

  beforeEach(() => {
    state = {
      users: usersAdapter.setAll(
        [createUsersEntity('PRODUCT-AAA'), createUsersEntity('PRODUCT-BBB'), createUsersEntity('PRODUCT-CCC')],
        {
          ...initialUsersState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        },
      ),
    };
  });

  describe('Users Selectors', () => {
    it('selectAllUsers() should return the list of Users', () => {
      const results = UsersSelectors.selectAllUsers(state);
      const selId = getUsersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = UsersSelectors.selectEntity(state) as UsersEntity;
      const selId = getUsersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectUsersLoaded() should return the current "loaded" status', () => {
      const result = UsersSelectors.selectUserById(state);

      expect(result).toBe(true);
    });

    it('selectUsersError() should return the current "error" state', () => {
      const result = UsersSelectors.selectUsersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
