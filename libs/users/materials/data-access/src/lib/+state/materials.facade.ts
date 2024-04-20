import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAddFolder } from '../models/add-folder.model';
import { MaterialsActions } from './materials.actions';
import * as MaterialsSelectors from './materials.selectors';
import { IAddMaterial } from '../models/add-material.model';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly foldersStatus$ = this.store.select(MaterialsSelectors.selectFoldersStatus);
  public readonly allFolders$ = this.store.select(MaterialsSelectors.selectAllFolders);
  public readonly openedFolder$ = this.store.select(MaterialsSelectors.selectOpenedFolder);

  public readonly materialsStatus$ = this.store.select(MaterialsSelectors.selectMaterialsStatus);
  public readonly allMaterials$ = this.store.select(MaterialsSelectors.selectAllMaterials);

  loadFolders() {
    this.store.dispatch(MaterialsActions.loadFolders());
  }
  deleteFolder(id: number) {
    this.store.dispatch(MaterialsActions.deleteFolders({ id }));
  }
  addFolder(folder: IAddFolder) {
    this.store.dispatch(MaterialsActions.addFolder({ folder }));
  }

  loadMaterials() {
    this.store.dispatch(MaterialsActions.loadMaterials());
  }
  deleteMaterials(id: number) {
    this.store.dispatch(MaterialsActions.deleteMaterials({ id }));
  }
  addMaterials(material: IAddMaterial) {
    this.store.dispatch(MaterialsActions.addMaterials({ material }));
  }
}
