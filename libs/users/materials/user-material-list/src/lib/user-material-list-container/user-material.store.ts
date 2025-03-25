import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { DeepReadonly } from '@users/core/utils';
import { tap } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MaterialsVM } from '../user-material-card/materials.vm';
import { UserMaterialsFacade } from '@users/user-material-data-access';
import { MaterialEntity } from '@users/core/data-access';
import { materialsVMAdapter } from '../user-material-card/materials.vm.adapter';

type MaterialListState = DeepReadonly<{
  materials: MaterialsVM[];
}>;

const initialState: MaterialListState = {
  materials: [],
};

@Injectable()
export class MaterialListContainerStore extends ComponentStore<MaterialListState> {
  private readonly materialsFacade = inject(UserMaterialsFacade);
  private readonly dialog = inject(MatDialog);
  public readonly materials$ = this.select(({ materials }) => materials);
  public readonly status$ = this.select(this.materialsFacade.status$, (status) => status);
  public readonly errors$ = this.select(this.materialsFacade.errors$, (error) => error);

  constructor() {
    super(initialState);
    this.materialsFacade.init();
    this.setMaterialsFromGlobalToLocalStore();
  }

  private setMaterialsFromGlobalToLocalStore(): void {
    this.effect(() => this.materialsFacade.allMaterials$
    .pipe(tap((materials: MaterialEntity[]) => this.patchMaterials(materials))));
  }

  private patchMaterials(materials: MaterialEntity[]): void {
    this.patchState({
      materials: materials.map((material) => materialsVMAdapter.entityToVM(material)),
    });
  }

  public deleteMaterial(material: MaterialsVM): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${material.title}` },
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
