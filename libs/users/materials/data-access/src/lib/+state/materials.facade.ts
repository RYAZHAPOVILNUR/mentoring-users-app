import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { foldersActions, materialsActions } from './materials.actions';
import {
  selectAllFolders, selectCurrentFolder,
  selectLoadingStatus,
  selectMaterialsForCurrentFolder
} from './materials.selectors';
import { Observable } from 'rxjs';
import { Folder } from '../models/folder.model';
import { Material } from '../models/material.model';
import { MaterialCreate } from '../models/material-create.model';

@Injectable()
export class MaterialsFacade {
  private readonly store: Store = inject(Store);
  public folders$: Observable<Folder[]> = this.store.select(selectAllFolders);
  public loadingStatus$: Observable<string> = this.store.select(selectLoadingStatus);
  public currentFolderMaterials$: Observable<Material[]> = this.store.select(selectMaterialsForCurrentFolder);
  public currentFolderData$: Observable<Folder | null> = this.store.select(selectCurrentFolder);

  public loadFolders(): void {
    this.store.dispatch(foldersActions.loadFolders());
  }
  public createFolder(title: string): void {
    this.store.dispatch(foldersActions.createFolder({ title }));
  }
  public removeFolder(id: number): void {
    this.store.dispatch(foldersActions.removeFolder({ id }));
  }
  public setCurrentFolder(): void {
    this.store.dispatch(foldersActions.loadCurrentFolder());
  }
  public loadMaterials(): void {
    this.store.dispatch(materialsActions.loadMaterials());
  }
  public addMaterial(data: MaterialCreate): void {
    this.store.dispatch(materialsActions.addMaterial({ material: data }));
  }
  public removeMaterial(materialId: number): void {
    this.store.dispatch(materialsActions.removeMaterial({ materialId }));
  }
}
