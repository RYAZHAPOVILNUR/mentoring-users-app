import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  addFolder, addMaterialFolder,
  AddNewFolder, AddNewMaterialReq, deleteFolder, deleteMaterialFolder,
  FolderInterface,
  loadFolders, loadMaterialsFolders, MaterialInterface,
  selectAllFolders, selectAllMaterials,
  selectFoldersError
} from '@users/materials/data-access';


@Injectable({ providedIn: 'root' })
export class FoldersFacade {
  private readonly store = inject(Store);

  public readonly folders$: Observable<FolderInterface[]> = this.store.select(selectAllFolders);
  public readonly materials$: Observable<MaterialInterface[]> = this.store.select(selectAllMaterials)


  loadFolders() {
    this.store.dispatch(loadFolders());
  }

  addNewFolder(newFolderData: AddNewFolder) {
    this.store.dispatch(addFolder({ newFolderData }));
  }

  deleteFolder(folderId: number) {
    this.store.dispatch(deleteFolder({ folderId }));
  }

  loadMaterials() {
    this.store.dispatch(loadMaterialsFolders())
  }

  addNewMaterialFolder(newMaterialFolderData: AddNewMaterialReq) {
    this.store.dispatch(addMaterialFolder({newMaterialFolderData}))
  }

  deleteMaterialFolder(materialFolderId: number) {
    this.store.dispatch(deleteMaterialFolder({ materialFolderId }));
  }
}
