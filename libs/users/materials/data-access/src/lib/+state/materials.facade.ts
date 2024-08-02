import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { foldersActions } from './folders/folders.actions';
import { AddFolderType } from './models/folder.type';
import { selectAllFolders, selectFoldersStatus, selectOpenedFolder } from './folders/folders.selectors';
import { materialsActions } from './materials/materials.actions';
import { AddMaterialType } from './models/material.type';
import { selectAllMaterials, selectMaterialsStatus, selectOpenedMaterial } from './materials/materials.selectors';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly foldersStatus$ = this.store.select(selectFoldersStatus);
  public readonly allFolders$ = this.store.select(selectAllFolders);
  public readonly openedFolder$ = this.store.select(selectOpenedFolder);
  public readonly materialsStatus$ = this.store.select(selectMaterialsStatus);
  public readonly allMaterials$ = this.store.select(selectAllMaterials);
  public readonly openedMaterial$ = this.store.select(selectOpenedMaterial);

  loadFolders() {
    this.store.dispatch(foldersActions.loadFolders());
  }

  addFolders(title: AddFolderType) {
    this.store.dispatch(foldersActions.addFolders({ title }));
  }

  deleteFolders(id: number) {
    this.store.dispatch(foldersActions.deleteFolders({ id }));
  }

  loadMaterials() {
    this.store.dispatch(materialsActions.loadMaterials());
  }

  addMaterials(material: AddMaterialType) {
    this.store.dispatch(materialsActions.addMaterials({ material }));
  }

  deleteMaterials(id: number) {
    this.store.dispatch(materialsActions.deleteMaterials({ id }));
  }
}
