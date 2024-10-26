import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  // selectCurrentMaterial,
  selectMaterialError, selectMaterialsByFolder,

  selectMaterialStatus
} from './materials.selectors';
import { MaterialsActions } from './materials.actions';
import { Observable } from 'rxjs';
import { selectFolders, selectOpenFolder } from '../folders/folders.selectors';
import { CreateMaterialDTO } from '../../models/materials-dto.model';
import { MaterialsVM } from '@users/materials';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);
  // public readonly materials$: Observable<MaterialsVM[]> = this.store.pipe(select(selectMaterialsByFolder));
  // public readonly currentMaterial$ = this.store.select(selectCurrentMaterial);
  public readonly materialStatus$: Observable<string> = this.store.select(selectMaterialStatus);
  public readonly materialError$: Observable<Error | null> = this.store.select(selectMaterialError);
  public readonly folders$ = this.store.select(selectFolders);
  public readonly currentFolder$ = this.store.select(selectOpenFolder);

  public getMaterialsByFolder(folderId: number): Observable<MaterialsVM[]> {
    return this.store.pipe(select(selectMaterialsByFolder(folderId)));
  }

  public loadMaterials(folderId: number): void {
    this.store.dispatch(MaterialsActions.loadMaterials({ folderId }));
  }

  public addMaterial(materialData: CreateMaterialDTO) {
    this.store.dispatch(MaterialsActions.addMaterial({ materialData }));
  }

  public deleteMaterial(materialId: number): void {
    this.store.dispatch(MaterialsActions.deleteMaterial({ materialId }));
  }
}
