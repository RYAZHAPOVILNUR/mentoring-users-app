import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  selectFolderNameById,
  selectMaterialError,
  selectMaterialPreviewById,
  selectMaterialsByFolder,
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

  public readonly materialStatus$: Observable<string> = this.store.select(selectMaterialStatus);
  public readonly materialError$: Observable<Error | null> = this.store.select(selectMaterialError);
  public readonly folders$ = this.store.select(selectFolders);
  public readonly currentFolder$ = this.store.select(selectOpenFolder);

  public getMaterialsByFolder(folderId: number): Observable<MaterialsVM[]> {
    return this.store.pipe(select(selectMaterialsByFolder(folderId)));
  }

  public getFolderNameById(folderId: number): Observable<string | null> {
    return this.store.select(selectFolderNameById(folderId));
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

  public getMaterialPreview(materialId: number): Observable<string | null> {
    return this.store.select(selectMaterialPreviewById(materialId));
  }

  public loadMaterialsPreview(materialId: number): void {
    this.store.dispatch(MaterialsActions.loadMaterialsPreview({ materialId }));
  }
}
