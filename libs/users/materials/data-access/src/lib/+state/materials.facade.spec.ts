import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MaterialsFacade } from './materials.facade';
import { initialState } from './materials.reducer';

describe('MaterialsFacade', () => {
  let facade: MaterialsFacade;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MaterialsFacade,
        provideMockStore({ initialState }),
      ],
    });

    facade = TestBed.inject(MaterialsFacade);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should dispatch addFolder action', () => {
    const spy = spyOn(store, 'dispatch');
    const folder = { name: 'New Folder', title: 'New Folder Title' };
    facade.addFolder(folder);
    expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({ type: '[Materials] Add Folder', folder }));
  });
});