import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentStore } from '@ngrx/component-store';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MaterialsEntity, MaterialsFacade, MaterialsVM } from '@users/materials/data-access';
import { tap } from 'rxjs';

type MaterialsListState = {
  materials: MaterialsVM[];
};

const initialState: MaterialsListState = {
  materials: [],
};

@Injectable()
export class MaterialsListContainerStore extends ComponentStore<MaterialsListState> {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly dialog = inject(MatDialog);
  public readonly status$ = this.select(this.materialsFacade.materialStatus$, (status) => status);
  public errors$ = this.select(this.materialsFacade.materialError$, (error) => error);
  public readonly materials$ = this.select(({ materials }) => materials);

  constructor() {
    super(initialState);
    this.setMaterialsFromGlobalToLocalStore();
  }

  private setMaterialsFromGlobalToLocalStore(): void {
    this.effect(() =>
      this.materialsFacade.allMaterials$.pipe(tap((materials: MaterialsEntity[]) => this.patchMaterials(materials)))
    );
  }

  private patchMaterials(materials: MaterialsEntity[]): void {
    this.patchState({ materials });
  }

  public deleteMaterial(material: MaterialsVM): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${material.title}?` },
    });
    this.effect(() =>
      dialogRef.afterClosed().pipe(
        tap((result: boolean) => {
          if (result) this.materialsFacade.deleteMaterial(material.id);
        })
      )
    );
  }
}
