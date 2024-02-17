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
import { selectRouteParam, selectRouteParams } from '@users/core/data-access';
import { Params } from '@angular/router';
import { MaterialCreate } from '../models/material-create.model';

@Injectable()
export class MaterialsFacade {
  private readonly store: Store = inject(Store);
  public folders$: Observable<Folder[]> = this.store.select(selectAllFolders);
  public loadingStatus$: Observable<string> = this.store.select(selectLoadingStatus);
  public currentFolderMaterials$: Observable<Material[]> = this.store.select(selectMaterialsForCurrentFolder);
  public currentFolderId$: Observable<Params> = this.store.select(selectRouteParams);
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
    // this.store.dispatch(foldersActions.loadCurrentFolder({ id: folderId }));
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





  // loaded$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsLoaded));
  // allMaterials$ = this.store.pipe(
  //   select(MaterialsSelectors.selectAllMaterials)
  // );
  // selectedMaterials$ = this.store.pipe(select(MaterialsSelectors.selectEntity));
  // init() {
  //   this.store.dispatch(MaterialsActions.initMaterials());
  // }
}
