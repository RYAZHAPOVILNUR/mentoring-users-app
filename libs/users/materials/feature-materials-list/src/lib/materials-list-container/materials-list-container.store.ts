import { FoldersFacade, TMaterial, MaterialsFacade, MaterialVM } from '@users/materials/data-access';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsVmAdapter } from '@users/materials/data-access';
import { ComponentStore } from '@ngrx/component-store';
import { DeepReadonly } from '@users/core/utils';
import { tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type MaterialsListState = DeepReadonly<{
  materials: TMaterial[];
}>;

const initialState: MaterialsListState = {
  materials: [],
};

@Injectable()
export class MaterialsListContainerStore extends ComponentStore<MaterialsListState> {
  public readonly MaterialsFacade = inject(MaterialsFacade);
  public readonly FoldersFacade = inject(FoldersFacade);
  private readonly dialog = inject(MatDialog);

  public readonly materials$ = this.MaterialsFacade.allMaterials$;
  public readonly materialsStatus$ = this.select(this.MaterialsFacade.materialsStatus$, (status) => status);
  public readonly materialsErrors$ = this.select(this.MaterialsFacade.materialsErrors$, (error) => error);

  constructor() {
    super(initialState);
    this.FoldersFacade.loadFolders();
    this.MaterialsFacade.loadMaterials();
    this.setMaterialsFromGlobalToLocalStore();
  }

  private setMaterialsFromGlobalToLocalStore(): void {
    this.effect(() =>
      this.MaterialsFacade.allMaterials$.pipe(tap((materials: MaterialVM[]) => this.patchMaterials(materials)))
    );
  }

  private patchMaterials(materials: MaterialVM[]): void {
    this.patchState({
      materials: materials.map((material) => MaterialsVmAdapter.entityToVM(material)),
    });
  }

  public onDeleteMaterial(material: TMaterial) {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы хотите удалить "${material.title}"?` },
    });

    dialogRef.afterClosed()
    .pipe(takeUntilDestroyed())
    .subscribe((result: boolean) => {
      if (result) {
        this.MaterialsFacade.deleteMaterials(material.id);
      }
    });
  }
}
