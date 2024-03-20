import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import {
  selectFilteredMaterials,
  selectFolders,
  selectMaterialsFeatureError,
  selectMaterialsFeatureStatus, selectRevealedFolder
} from './materials.selectors';
import { CreateMaterial } from '../types/';
import { map, tap, first } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly folders$ = this.store.select(selectFolders);
  public readonly status$ = this.store.select(selectMaterialsFeatureStatus);
  public readonly error$ = this.store.select(selectMaterialsFeatureError);
  public readonly revealedFolder$ = this.store.select(selectRevealedFolder);
  public readonly filteredMaterials$ = this.store.select(selectFilteredMaterials);

  constructor() {
    this.store.dispatch(MaterialsActions.loadFolders());
    localStorage.getItem('revealedFolder')
    && this.store.dispatch(MaterialsActions.loadMaterials());
  }

  deleteFolder(id: number): void {
    this.store.dispatch(MaterialsActions.deleteFolder({ id }));
  }

  addFolder(newFolder: { title: any }): void {
    this.store.dispatch(MaterialsActions.addFolder({ newFolder }));
  }

  revealFolder(id: number): void {
    this.store.dispatch(MaterialsActions.loadMaterials());
    this.folders$.pipe(
      first(),
      map(folders =>
        folders.find(folder => folder.id === id)),
      tap(filteredFolder => {
        localStorage.setItem('revealedFolder', JSON.stringify(filteredFolder))
        this.store.dispatch(MaterialsActions.revealFolder({ id }));
      })
    ).subscribe();
  }

  deleteMaterial(id: number): void {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }

  addMaterial(newMaterial: Omit<CreateMaterial, 'folder_id'>): void {
    this.revealedFolder$.pipe(
      first(),
      tap(folder => {
        if (folder) {
          const materialData: CreateMaterial = {
            ...newMaterial,
            folder_id: folder!.id
          };
          this.store.dispatch(MaterialsActions.addMaterial({ newMaterial: materialData }));
        }
      })
      ).subscribe()
  }
}
