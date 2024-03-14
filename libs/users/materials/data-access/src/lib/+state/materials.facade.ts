import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FoldersActions } from './materials.actions';
import { IFolder, IFolderCreate } from '../models/folders.model';
import {
  selectMaterials,
  selectMaterialsError,
  selectMaterialsMaterials,
  selectMaterialsOpenedFolder,
  selectMaterialsStatus,
} from './materials.selectors';
import { IMaterialCreate } from '../models/materials.model';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly folders$ = this.store.select(selectMaterials);
  public readonly materials$ = this.store.select(selectMaterialsMaterials);
  public readonly openedFolder$ = this.store.select(
    selectMaterialsOpenedFolder
  );
  public readonly status$ = this.store.select(selectMaterialsStatus);
  public readonly error$ = this.store.select(selectMaterialsError);

  loadFolders() {
    this.store.dispatch(FoldersActions.loadFolders());
  }

  addFolder(foldersData: IFolderCreate) {
    this.store.dispatch(FoldersActions.addFolders({ foldersData }));
  }

  deleteFolder(id: number) {
    this.store.dispatch(FoldersActions.deleteFolders({ id }));
  }

  loadMaterials() {
    this.store.dispatch(FoldersActions.loadMaterials());
  }

  deleteMaterial(id: number) {
    this.store.dispatch(FoldersActions.deleteMaterials({ id }));
  }

  openFolder(folder: IFolder) {
    this.store.dispatch(FoldersActions.openFolder({ folder }));
  }

  addMaterial(material: IMaterialCreate) {
    this.store.dispatch(FoldersActions.addMaterials({ material }));
  }

  addMaterialPDF(material: IMaterialCreate) {
    this.store.dispatch(FoldersActions.addMaterialsPDF({ material }));
  }
}
