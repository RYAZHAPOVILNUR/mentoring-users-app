import { inject, Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { selectMaterials, selectMaterialsByFolderId, selectMaterialsStatus } from './materials.selectors';
import { selectFolderById } from './folders/folders.selectors';
import { AddMaterialDTO } from '../models/material.model';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly allMaterials$ = this.store.pipe(select(selectMaterials));
  public readonly status$ = this.store.pipe(select(selectMaterialsStatus));
  loadMaterials() {
    this.store.dispatch(MaterialsActions.loadMaterials());
  }

  getMaterialsByFolderId(folderId: number) {
    return this.store.pipe(select(selectMaterialsByFolderId(folderId)));
  }
  getFolderById(folderId: number) {
    return this.store.pipe(select(selectFolderById(folderId)));
  }

  deleteMaterial(materialId: number) {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id: materialId }));
  }
  addMaterial(material: AddMaterialDTO) {
    this.store.dispatch(MaterialsActions.addMaterial({material: material}));
  }
}
