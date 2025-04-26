import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { MaterialsVM } from '../../../../vm/materials-vm';
import { MaterialsFacade } from '@users/materials/data-access';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { MaterialsEntity } from '@users/materials/data-access';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';

type MaterialListState = {
  materials: MaterialsVM[];
};

const initialsState: MaterialListState = {
  materials: [],
};

@Injectable()
export class MaterialListContainerStore extends ComponentStore<MaterialListState> {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly dialog = inject(MatDialog);
  public readonly materials$ = this.select(({ materials }) => materials);
  public readonly status$ = this.select(this.materialsFacade.status$, (status) => status);

  constructor() {
    super(initialsState);
    this.materialsFacade.loadMaterials();
    this.setMaterialsFromGlobalToLocalStore();
  }

  private setMaterialsFromGlobalToLocalStore(): void {
    this.effect(() =>
      this.materialsFacade.filteredMaterials$.pipe(
        tap((materials: MaterialsEntity[]) => this.patchState({ materials }))
      )
    );
  }

  public deleteMaterial(material: MaterialsVM): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить материал ${material.title} ?` },
    });
    this.effect(() =>
      dialogRef.afterClosed().pipe(
        tap((result: boolean) => {
          if (result) this.materialsFacade.deleteMaterial(material.id);
        })
      )
    );
  }

  public filteredMaterials(folder_id: number): void {
    const filter = { folder_id };
    this.materialsFacade.filterMaterials(filter);
  }
}
