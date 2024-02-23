import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import {
  selectFolders,
  selectIsLoadingFolders,
  selectIsLoadingMaterials,
  selectMaterialsByFolderId
} from './materials.selectors';
import { IDeleteItem, IMaterialPost } from '../models/models';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly folders$ = this.store.select(selectFolders);
  public readonly isLoadingFolders$ = this.store.select(selectIsLoadingFolders);
  public readonly isLoadingMaterials$ = this.store.select(selectIsLoadingMaterials);
  public readonly materials$ = this.store.select(selectMaterialsByFolderId);

  loadMaterialFolders(): void {
    this.store.dispatch(MaterialsActions.loadMaterialsFolders());
  }

  addNewFolder(title: string): void {
    this.store.dispatch(MaterialsActions.addMaterialsFolder({ title }));
  }

  deleteFolder(folder: IDeleteItem): void {
    this.store.dispatch(MaterialsActions.deleteMaterialsFolder({ folder }));
  }

  loadMaterials(): void {
    this.store.dispatch(MaterialsActions.loadMaterialss());
  }

  addNewMaterial(material: IMaterialPost): void {
    this.store.dispatch(MaterialsActions.addMaterial({ material }));
  }

  deleteMaterial(material: IDeleteItem): void {
    this.store.dispatch(MaterialsActions.deleteMaterial({ deleteItem: material }));
  }
}
