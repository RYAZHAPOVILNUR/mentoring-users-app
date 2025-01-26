import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as MaterialsActions from './materials.actions';
import { MaterialsEffects } from './materials.effects';
import { MaterialsFacade } from './materials.facade';
import { MaterialsEntity } from './materials.models';
import { MATERIALS_FEATURE_KEY, MaterialsState, initialMaterialsState, materialsReducer } from './materials.reducer';
import * as MaterialsSelectors from './materials.selectors';

interface TestSchema {
  materials: MaterialsState;
}

describe('MaterialsFacade', () => {
  let facade: MaterialsFacade;
  let store: Store<TestSchema>;
  const createMaterialsEntity = (id: string, name = ''): MaterialsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(MATERIALS_FEATURE_KEY, materialsReducer),
          EffectsModule.forFeature([MaterialsEffects]),
        ],
        providers: [MaterialsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(MaterialsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allMaterials$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allMaterials$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadMaterialsSuccess` to manually update list
     */
    it('allMaterials$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allMaterials$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        MaterialsActions.loadMaterialsSuccess({
          materials: [createMaterialsEntity('AAA'), createMaterialsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allMaterials$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
