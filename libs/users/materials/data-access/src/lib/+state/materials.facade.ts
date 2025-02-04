import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { IAddFolder, IMaterial } from './materials.reducer';
import { selectFolders, selectFoldersError, selectFoldersStatus, selectMaterials, selectSelectedFolder } from './materials.selectors';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  // Потоки данных
  public readonly folders$ = this.store.select(selectFolders);
  public readonly status$ = this.store.select(selectFoldersStatus);
  public readonly error$ = this.store.select(selectFoldersError);
  public readonly materials$ = this.store.select(selectMaterials);
  public readonly selectedFolder$ = this.store.select(selectSelectedFolder);


  // Методы для работы с папками
  loadFolders(): void {
    this.store.dispatch(MaterialsActions.loadFolders());
  }

  addFolder(folder: IAddFolder): void {
    this.store.dispatch(MaterialsActions.addFolder({ folder }));
  }

  deleteFolder(id: string): void {
    this.store.dispatch(MaterialsActions.deleteFolder({ id }));
  }

  openFolder(): void {
    this.store.dispatch(MaterialsActions.openFolder());
  }

  // Методы для работы с материалами
  loadMaterials(): void {
    this.store.dispatch(MaterialsActions.loadMaterials());
  }

  addMaterial(material: IMaterial): void {
    this.store.dispatch(MaterialsActions.addMaterial({ material }));
  }

  deleteMaterial(materialId: string): void {
    this.store.dispatch(MaterialsActions.deleteMaterial({ materialId }));
  }

  openMaterial(material: IMaterial): void {
    this.store.dispatch(MaterialsActions.openMaterial({ material }));
  }
}