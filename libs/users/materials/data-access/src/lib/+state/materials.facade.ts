import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import {
  selectAllFolders,
  selectAllMaterials,
  selectMaterials,
  selectOpenedFolder,
  selectStatus
} from './materials.selectors';
import { FolderAdd } from '../models/folder-add.model';
import { MaterialAdd } from '../models/material-add.model';

@Injectable({providedIn: 'root'})
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly allFolders$ = this.store.select(selectAllFolders);
  public readonly materialsStatus$ = this.store.select(selectStatus);
  public readonly allMaterials$ = this.store.select(selectAllMaterials);
  public readonly openedFolder$ = this.store.select(selectOpenedFolder);
  public readonly materials$ = this.store.select(selectMaterials);

  public initFolders() {
    this.store.dispatch(MaterialsActions.loadFolders());
  }

  public deleteFolder(id: number) {
    this.store.dispatch(MaterialsActions.deleteFolder({id}));
  }

  public addFolder(title: FolderAdd) {
    this.store.dispatch(MaterialsActions.addFolder({title}));
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
