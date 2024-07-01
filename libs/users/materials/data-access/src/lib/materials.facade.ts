import { inject, Injectable } from '@angular/core';
import { materialsActions } from './+state/materials/materials.actions';
import { Store } from '@ngrx/store';
import { selectMaterialsByFolderId, selectMaterialsStatus } from './+state/materials/materials.selectors';
import { MaterialsState } from './services/materials.state';
import { MaterialCreate } from './types/material-create.type';
import { foldersActions } from './+state/folders/folders.actions';
import { selectFolderById, selectFolders, selectFoldersStatus } from './+state/folders/folders.selectors';
import { MaterialEntity } from './interfaces/material-entity.interface';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly materialsState = inject(MaterialsState);
  private readonly store = inject(Store);
  readonly selectedMaterials$ = this.store.select(selectMaterialsByFolderId);
  readonly materialsStatus$ = this.store.select(selectMaterialsStatus);
  readonly selectedFolder$ = this.store.select(selectFolderById);
  readonly foldersStatus$ = this.store.select(selectFoldersStatus);
  readonly folders$ = this.store.select(selectFolders);
  readonly materialCreateDialogOpen$ = this.materialsState.materialCreateDialogOpen$;
  readonly folderCreateDialogOpen$ = this.materialsState.folderCreateDialogOpen$;
  readonly materialOpen$ = this.materialsState.materialOpen$;
  readonly folderDelete$ = this.materialsState.folderDelete$;
  readonly folderOpen$ = this.materialsState.folderOpen$;

  loadMaterials(): void {
    this.store.dispatch(materialsActions.loadMaterials());
  }

  loadFolders(): void {
    this.store.dispatch(foldersActions.loadFolders());
  }

  emitOpenFolder(id: number): void {
    this.materialsState.openFolder(id);
  }

  emitDeleteFolder(id: number): void {
    this.materialsState.deleteFolder(id);
  }

  deleteFolder(id: number): void {
    this.store.dispatch(foldersActions.deleteFolder({ id }));
  }

  emitOpenMaterial(material: MaterialEntity): void {
    this.materialsState.openMaterial(material);
  }

  emitDeleteMaterial(id: number): void {
    this.materialsState.deleteMaterial(id);
  }


  deleteMaterial(id: number): void {
    this.store.dispatch(materialsActions.deleteMaterial({ id }));
  }


  createMaterial(material: MaterialCreate): void {
    this.store.dispatch(materialsActions.createMaterial({ material }));
  }

  createFolder(title: string): void {
    this.store.dispatch(foldersActions.createFolder({ title }));
  }

  openMaterial(material: MaterialEntity): void {
    this.materialsState.openMaterial(material);
  }

  openCreateMaterialDialog(): void {
    this.materialsState.openCreateMaterialDialog();
  }

  openCreateFolderDialog() {
    this.materialsState.openCreateFolderDialog();
  }

}