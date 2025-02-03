import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAddFolder } from '../models/folder-add.model';
import { IAddMaterial } from '../models/materials-add.model';
import * as MaterialsActions from './materials.actions';
import * as MaterialsSelectors from './materials.selectors';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly folders$ = this.store.pipe(select(MaterialsSelectors.selectAllFolders));
  public readonly foldersStatus$ = this.store.pipe(select(MaterialsSelectors.selectFoldersStatus));
  public readonly foldersErrors$ = this.store.pipe(select(MaterialsSelectors.selectFoldersErrors));

  public readonly allMaterials$ = this.store.pipe(select(MaterialsSelectors.selectAllMaterials));
  public readonly selectedFolderId$ = this.store.select(MaterialsSelectors.selectSelectedFolderId);

  public readonly materialsByFolder$ = this.store.select(MaterialsSelectors.selectMaterialsByFolder);

  public readonly openedFolder$ = this.store.select(MaterialsSelectors.selectOpenedFolder);

  initFolders() {
    this.store.dispatch(MaterialsActions.initFolders());
  }

  initMaterials() {
    this.store.dispatch(MaterialsActions.initMaterials());
  }

  addFolder(folder: IAddFolder) {
    this.store.dispatch(MaterialsActions.addFolder({ folder }));
  }

  deleteFolder(id: number) {
    this.store.dispatch(MaterialsActions.deleteFolder({ id }));
  }

  loadFolder() {
    this.store.dispatch(MaterialsActions.loadFolder());
  }

  addMaterial(material: IAddMaterial) {
    this.store.dispatch(MaterialsActions.addMaterial({ material }));
  }

  deleteMaterial(id: number) {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }
}
