import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as MaterialSelectors from './materials.selectors';
import { MaterialsActions } from './materials.actions';
import { CreateFolderInput } from '../models/create-folder-input.type';
import { CreateMaterialInput } from '../models/create-material-input.interface';
import { Folder } from '../models/folder.interface';

@Injectable({ providedIn: 'root' })
export class MaterialFacade {
  private readonly store = inject(Store);

  public readonly status$ = this.store.pipe(
    select(MaterialSelectors.selectMaterialStatus)
  );

  public readonly error$ = this.store.pipe(
    select(MaterialSelectors.selectMaterialError)
  );

  public readonly allFolders$ = this.store.pipe(
    select(MaterialSelectors.selectFolders)
  );

  public readonly allMaterials$ = this.store.pipe(
    select(MaterialSelectors.selectMaterials)
  );

  public readonly openedFolder$ = this.store.pipe(
    select(MaterialSelectors.selectOpenedFolder)
  );

  loadFolders() {
    this.store.dispatch(MaterialsActions.loadFolders());
  }

  setOpenedFolder(openedFolder: Folder) {
    this.store.dispatch(MaterialsActions.setOpenedFolder({ openedFolder }));
  }

  deleteFolder(id: number) {
    this.store.dispatch(MaterialsActions.deleteFolder({ id }));
  }

  createFolder(createFolderInput: CreateFolderInput) {
    this.store.dispatch(MaterialsActions.createFolder({ createFolderInput }));
  }

  loadMaterials(folderId: number) {
    this.store.dispatch(MaterialsActions.loadMaterials({ folderId }));
  }

  createMaterial(createMaterialInput: CreateMaterialInput) {
    this.store.dispatch(
      MaterialsActions.createMaterial({ createMaterialInput })
    );
  }

  deleteMaterial(id: number) {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }
}
