import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MaterialsSelectors from './materials.selectors';
import { MaterialsActions } from './materials.actions';
import { FolderAdd } from '../models/folder-add.model';
import { MaterialAdd } from '../models/material-add.model';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly foldersStatus$ = this.store.select(MaterialsSelectors.selectFoldersStatus);
  public readonly allFolders$ = this.store.select(MaterialsSelectors.selectAllFolders);
  public readonly openedFolder$ = this.store.select(MaterialsSelectors.selectOpenedFolder);
  public readonly materialsStatus$ = this.store.select(MaterialsSelectors.selectMaterialsStatus);
  public readonly allMaterials$ = this.store.select(MaterialsSelectors.selectAllMaterials);
  public readonly folderMaterials$ = this.store.select(MaterialsSelectors.selectFolderMaterials);

  public loadFolders(): void {
    this.store.dispatch(MaterialsActions.loadFolders());
  }

  public loadFolder(): void {
    this.store.dispatch(MaterialsActions.loadFolder());
  }

  public addFolder(folder: FolderAdd): void {
    this.store.dispatch(MaterialsActions.addFolder({ folder }));
  }

  public deleteFolder(id: number): void {
    this.store.dispatch(MaterialsActions.deleteFolder({ id }));
  }

  public loadMaterials(): void {
    this.store.dispatch(MaterialsActions.loadMaterials());
  }

  public addMaterial(material: MaterialAdd): void {
    this.store.dispatch(MaterialsActions.addMaterial({ material }));
  }

  public deleteMaterial(id: number): void {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }
}
