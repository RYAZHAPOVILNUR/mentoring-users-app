import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialsActions } from './materials/materials.actions';
import {
  selectAllMaterials,
  selectMaterials,
  selectMaterialsStatus,
} from './materials/materials.selectors';
import { MaterialAdd } from '../models/material-add.model';
import { selectAllFolders, selectFoldersStatus, selectOpenedFolder } from './folders/folders.selectors';
import { FoldersActions } from './folders/folders.actions';
import { FolderAdd } from '../models/folder-add.model';

@Injectable({providedIn: 'root'})
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly allFolders$ = this.store.select(selectAllFolders);
  public readonly openedFolder$ = this.store.select(selectOpenedFolder);
  public readonly foldersStatus$ = this.store.select(selectFoldersStatus);

  public readonly materialsStatus$ = this.store.select(selectMaterialsStatus);
  public readonly allMaterials$ = this.store.select(selectAllMaterials);
  public readonly materials$ = this.store.select(selectMaterials);

  public initFolders() {
    this.store.dispatch(FoldersActions.loadFolders());
  }

  public deleteFolder(id: number) {
    this.store.dispatch(FoldersActions.deleteFolder({id}));
  }

  public addFolder(title: FolderAdd) {
    this.store.dispatch(FoldersActions.addFolder({title}));
  }

  public loadMaterials() {
    this.store.dispatch(MaterialsActions.loadMaterials());
  }

  public deleteMaterial(id: number) {
    this.store.dispatch(MaterialsActions.deleteMaterial({id}));
  }

  public addMaterial(material: MaterialAdd) {
    this.store.dispatch(MaterialsActions.addMaterial({material}));
  }
}
