import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as FoldersActions from './folders.actions';
import { FoldersEffects } from './folders.effects';
import { facadeF } from './folders.facade';
import { FoldersEntity } from './folders.models';
import { FOLDERS_FEATURE_KEY, FoldersState, initialFoldersState, foldersReducer } from './folders.reducer';
import * as FoldersSelectors from './folders.selectors';

interface TestSchema {
  folders: FoldersState;
}

describe('facadeF', () => {
  let facade: facadeF;
  let store: Store<TestSchema>;
  const createFoldersEntity = (id: string, name = ''): FoldersEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(FOLDERS_FEATURE_KEY, foldersReducer),
          EffectsModule.forFeature([FoldersEffects]),
        ],
        providers: [facadeF],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(facadeF);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.folders$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.folders$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadFoldersSuccess` to manually update list
     */
    it('folders$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.folders$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        FoldersActions.loadFoldersSuccess({
          folders: [createFoldersEntity('AAA'), createFoldersEntity('BBB')],
        })
      );

      list = await readFirst(facade.folders$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
