import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as FoldersActions from './folders.actions';
import { loadFolders, addFolder, deleteFolder, openFolder } from './folders.effects';
import { FoldersFacade } from './folders.facade';
import { FoldersEntity } from './folder-models';
import { FOLDERS_FEATURE_KEY, FoldersState, foldersReducer } from './folders.reducer';
import { ApiService } from '@users/core/http';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { CreateFolderDTO } from '../models/folder-models';

interface TestSchema {
  folders: FoldersState;
}

describe('FoldersFacade', () => {
  let facade: FoldersFacade;
  let store: Store<TestSchema>;
  let actions$: Observable<any>;
  let apiService: jest.Mocked<ApiService>;

  const createFoldersEntity = (id: string, name = ''): FoldersEntity => ({
    id,
    name: name || `name-${id}`,
  });

  const createTestFolderDTO = (): CreateFolderDTO => ({
    title: 'Test folder',
    id: 0
  });

  beforeEach(() => {
    apiService = {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn()
    } as any;

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(FOLDERS_FEATURE_KEY, foldersReducer),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature({
          loadFolders,
          addFolder,
          deleteFolder,
          openFolder
        } as any), 
      ],
      providers: [
        FoldersFacade,
        provideMockActions(() => actions$),
        { provide: ApiService, useValue: apiService }
      ],
    });

    store = TestBed.inject(Store);
    facade = TestBed.inject(FoldersFacade);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('allFolders$ should return empty array initially', async () => {
    const folders = await readFirst(facade.allFolders$);
    expect(folders).toEqual([]);
  });

  it('should dispatch loadFolders action on loadFolders()', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    facade.loadFolders();
    expect(dispatchSpy).toHaveBeenCalledWith(FoldersActions.loadFolders());
  });

  describe('loadFoldersSuccess', () => {
    it('should update allFolders$ when loadFoldersSuccess is dispatched', async () => {
      const folders = [
        createFoldersEntity('1', 'Folder 1'),
        createFoldersEntity('2', 'Folder 2')
      ];

      actions$ = of(FoldersActions.loadFoldersSuccess({ folders }));

      const result = await readFirst(facade.allFolders$);
      expect(result).toEqual(folders);
    });
  });

  it('should dispatch addFolder action with correct DTO', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const testFolder: CreateFolderDTO = createTestFolderDTO();
    
    facade.addFolder(testFolder);
    
    expect(dispatchSpy).toHaveBeenCalledWith(
      FoldersActions.addFolder({ folder: testFolder })
    );
  });

  it('should dispatch deleteFolder action on deleteFolder()', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const id = 123;
    facade.deleteFolder(id);
    expect(dispatchSpy).toHaveBeenCalledWith(FoldersActions.deleteFolder({ id }));
  });

  it('should dispatch openFolder action on openedFolder()', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const id = 456;
    facade.openedFolder(id);
    expect(dispatchSpy).toHaveBeenCalledWith(FoldersActions.openFolder({ id }));
  });
});