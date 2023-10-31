import { CreateFolder } from './../model/create-folder.model';
import { Folder } from '../model/materials.model';
import { Store } from '@ngrx/store';
import { Injectable, inject } from '@angular/core';
import {
  selectAllFolders,
  selectMaterials,
  selectOpenedFolder,
  selectStatus,
} from './materials.selectors';
import { MaterialsActions } from './materials.actions';
import { CreateMaterial } from '../model/create-material.model';

@Injectable({
  providedIn: 'root',
})
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly openedFolder$ = this.store.select(selectOpenedFolder);
  public readonly allFolders$ = this.store.select(selectAllFolders);
  public readonly getStatus$ = this.store.select(selectStatus);
  public readonly getMaterials$ = this.store.select(selectMaterials);

  addFolder(folder: CreateFolder) {
    this.store.dispatch(MaterialsActions.addFolder({ folder }));
  }

  getFolders() {
    this.store.dispatch(MaterialsActions.loadFolders());
  }

  deleteFolder(id: number) {
    this.store.dispatch(MaterialsActions.deleteFolder({ id }));
  }

  // materials=============================
  getMaterials() {
    this.store.dispatch(MaterialsActions.loadMaterials());
  }

  addMaterial(material: CreateMaterial) {
    this.store.dispatch(MaterialsActions.addMaterial({ material }));
  }
  deleteMaterial(id: number) {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }
}
