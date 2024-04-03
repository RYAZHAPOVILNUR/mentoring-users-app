import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import {
  selectFolders, selectMaterials,
  selectMaterialsFeatureError,
  selectMaterialsFeatureStatus, selectOpenedFolder
} from './materials.selectors';
import { CreateMaterial } from '../types';
import { first, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  public readonly folders$ = this.store.select(selectFolders);
  public readonly status$ = this.store.select(selectMaterialsFeatureStatus);
  public readonly error$ = this.store.select(selectMaterialsFeatureError);
  public readonly materials$ = this.store.select(selectMaterials);
  public readonly openedFolder$ = this.store.select(selectOpenedFolder);

  constructor() {
    this.openedFolder$.pipe(tap(x => console.log(x))).subscribe()
  }


  loadFolders(): void {
    this.store.dispatch(MaterialsActions.loadFolders())
  }
  deleteFolder(id: number): void {
    this.store.dispatch(MaterialsActions.deleteFolder({ id }));
  }

  addFolder(newFolder: { title: string }): void {
    this.store.dispatch(MaterialsActions.addFolder({ newFolder }));
  }

  openFolder(): void {
    this.store.dispatch(MaterialsActions.loadMaterials());
    this.store.dispatch(MaterialsActions.openFolder());
  }

  deleteMaterial(id: number): void {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }

  addMaterial(newMaterial: Omit<CreateMaterial, 'folder_id'>): void {
    this.openedFolder$.pipe(
      first(),
      tap((currentFolder) => {
        this.store.dispatch(MaterialsActions.addMaterial({
          newMaterial: {
            ...newMaterial,
            folder_id: currentFolder!.id
          }
        }));
      })
    ).subscribe();
  }
}
