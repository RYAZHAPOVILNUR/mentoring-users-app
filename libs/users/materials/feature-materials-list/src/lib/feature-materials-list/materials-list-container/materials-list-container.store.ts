import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Material, MaterialsFacade } from '@users/materials/data-access';
import { Router } from '@angular/router';
import { filter, map, Observable, switchMap, tap, withLatestFrom } from 'rxjs';

export interface MaterialsListContainerState {
  materials: Material[];
  folderId: number | null;
  folderTitle: string | null;
};

const initialState: MaterialsListContainerState = {
  materials: [],
  folderId: null,
  folderTitle: null,
};

@Injectable({ providedIn: 'root' })
export class MaterialsListContainerStore extends ComponentStore<MaterialsListContainerState> {
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly router = inject(Router);

  public readonly materials$ = this.select(({ materials }) => materials);
  public readonly folderId$ = this.select(({ folderId }) => folderId);
  public readonly folderTitle$ = this.select(({ folderTitle }) => folderTitle)

  private readonly validFolderId$: Observable<number> = this.folderId$.pipe(
    filter((id): id is number => !!id)
  );

  readonly updateMaterials = this.updater<Material[]>((state, materials) => ({
    ...state,
    materials,
  }));

  readonly setFolderId = this.updater<number>((state, folderId) => ({
    ...state,
    folderId,
  }));

  readonly setFolderTitle = this.updater<string>((state, folderTitle) => ({
    ...state,
    folderTitle,
  }));

  readonly loadMaterialsEffect = this.effect<number>((folderId$) =>
    folderId$.pipe(
      switchMap((folderId) =>
        this.materialsFacade.loadMaterials(folderId).pipe(
          map((materials) => materials.filter((material) => material.folder_id === folderId)),
          withLatestFrom(this.materialsFacade.allFolders),
          map(([materials, folders]) => {
            const folder = folders.find((f) => f.id === folderId);
            const folderTitle = folder ? folder.title : 'Unknown Folder';
            return { materials, folderTitle };
          }),
          tap(({ materials, folderTitle }) => {
            this.updateMaterials(materials);
            this.setFolderTitle(folderTitle);
          })
        )
      )
    )
  );

  constructor() {
    super(initialState);
    this.loadMaterialsEffect(this.validFolderId$);
  }
}