import { foldersFacade, IMaterial, materialsFacade, MaterialVM } from '@users/materials/data-access';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsVmAdapter } from '@users/materials/data-access';
import { ComponentStore } from '@ngrx/component-store';
import { DeepReadonly } from '@users/core/utils';
import { tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';

type MaterialsListState = DeepReadonly<{
  materials: IMaterial[];
}>;

const initialState: MaterialsListState = {
  materials: [],
};

@Injectable()
export class MaterialsListContainerStore extends ComponentStore<MaterialsListState> {
  public readonly materialsFacade = inject(materialsFacade);
  public readonly foldersFacade = inject(foldersFacade);
  private readonly dialog = inject(MatDialog);

  public readonly materials$ = this.materialsFacade.allMaterials$;
  public readonly materialsStatus$ = this.select(this.materialsFacade.materialsStatus$, (status) => status);
  public readonly materialsErrors$ = this.select(this.materialsFacade.materialsErrors$, (error) => error);

  constructor() {
    super(initialState);
    this.foldersFacade.loadFolders();
    this.materialsFacade.loadMaterials();
    this.setMaterialsFromGlobalToLocalStore();
  }

  private setMaterialsFromGlobalToLocalStore(): void {
    this.effect(() =>
      this.materialsFacade.allMaterials$.pipe(tap((materials: MaterialVM[]) => this.patchMaterials(materials)))
    );
  }

  private patchMaterials(materials: MaterialVM[]): void {
    this.patchState({
      materials: materials.map((material) => MaterialsVmAdapter.entityToVM(material)),
    });
  }

  public onDeleteMaterial(material: IMaterial) {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы хотите удалить "${material.title}"?` },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.materialsFacade.deleteMaterials(material.id);
      }
    });
  }
}
