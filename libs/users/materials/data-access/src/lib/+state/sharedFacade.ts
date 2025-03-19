import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FoldersErrors } from '@users/data-access';
import { filter, Observable, switchMap, take, tap } from 'rxjs';
import { CreateFolderDTO } from '../models/folders-dto.model';
import { CreateMaterialsDTO } from '../models/materials-dto.model';
import * as FoldersActions from './folders/folders.actions';
import * as FoldersSelectors from './folders/folders.selectors';
import { materialsActions } from './materials/materials.actions';
import * as MaterialsSelectors from './materials/materials.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class SharedFacade {
  private readonly store = inject(Store);

  public readonly statusFolders$ = this.store.select(FoldersSelectors.selectFoldersStatus);
  public readonly allFolders$ = this.store.select(FoldersSelectors.selectAllFolders);
  public readonly openedFolders$ = this.store.select(FoldersSelectors.selectOpenedFolder);
  public readonly errorsFolders$: Observable<FoldersErrors | null> = this.store.select(FoldersSelectors.selectFoldersError);
  public readonly statusMaterials$ = this.store.select(MaterialsSelectors.selectMaterialsStatus);
  public readonly errorsMaterials$ = this.store.select(MaterialsSelectors.selectMaterialsError);
  public readonly materialsForOpenedFolder$ = this.store.select(
    MaterialsSelectors.selectMaterialsForOpenedFolder);

  initFolders() {
    this.store.dispatch(FoldersActions.initFolders());
  }

  initMaterials() {
    this.store.dispatch(materialsActions.initMaterials());
  }

  deleteFolder(id: number) {
    this.store.dispatch(FoldersActions.deleteFolder({ id }));
  }

  deleteMaterials(id: number) {
    this.store.dispatch(materialsActions.deleteMaterials({ id }));
  }

  addFolder(folderData: CreateFolderDTO) {
    this.store.dispatch(FoldersActions.createFolder({ folderData }))
  }

  addMaterial(materialData: CreateMaterialsDTO) {
    this.store.dispatch(materialsActions.addMaterials({ materialData }));
  }

  initFoldersIfNotLoaded(): void {
    this.allFolders$
      .pipe(
        take(1),
        filter(folders => folders.length === 0),
        tap(() => this.store.dispatch(FoldersActions.initFolders())),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  /**
   * Полная загрузка папок и материалов для открытой папки
   */
  initFoldersAndMaterials(): void {
    this.statusFolders$
      .pipe(
        take(1),
        switchMap(status => {
          if (status === 'init') {
            // Если папки ещё не загружены
            this.initFoldersIfNotLoaded();
          }
          // Возвращаем Observable для статуса после загрузки
          return this.statusFolders$.pipe(filter(s => s === 'loaded'));
        }),
        tap(() => {
          this.store.dispatch(materialsActions.initMaterials()); // Загружаем материалы
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

}


