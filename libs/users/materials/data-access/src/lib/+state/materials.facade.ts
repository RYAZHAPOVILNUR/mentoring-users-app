import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialsActions, FoldersActions } from './materials.actions';
import { Folder } from '../models/folder.model';
import { selectAllFolders, selectAllMaterials, selectOpenedFolder } from './materials.selectors';
import { Material } from '../models/material.model';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly folders$ = this.store.select(selectAllFolders)
  public readonly openedFolder$ = this.store.select(selectOpenedFolder)
  public readonly allMaterials$ = this.store.select(selectAllMaterials)
  
  loadFolder(folder: Folder) {
    this.store.dispatch(FoldersActions.loadFolder({folder}))
  }

  loadFolders() {
    this.store.dispatch(FoldersActions.loadFolders())
  }

  folderDeleted(id: number) {
    this.store.dispatch(FoldersActions.deleteFolder({id}))
  }

  loadMaterails() {
    this.store.dispatch(MaterialsActions.loadMaterails())
  }

  loadFolderId() {
    this.store.dispatch(FoldersActions.loadFolderId())
  }

  loadMaterail(material: Material) {
    this.store.dispatch(MaterialsActions.loadMaterial({material}))
  }

  deleteMaterial(id: number) {
    this.store.dispatch(MaterialsActions.deleteMaterail({id}))
  }
}
