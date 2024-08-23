import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentStore } from '@ngrx/component-store';
import { DeepReadonly } from '@users/core/utils';
import { MaterialsType } from 'libs/users/materials/data-access/src/lib/models/material.type';
import { foldersFacade, materialsFacade } from '@users/materials/data-access';
import { tap } from 'rxjs';
import { MaterialsVMAdapter } from '../../../../view-models/materials-vm.adapter';
import { MaterialsVM } from 'libs/users/materials/view-models/materials-vm';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';

type MaterialsListState = DeepReadonly<{
  materials: MaterialsType[];
}>;

const initialState: MaterialsListState = {
  materials: [],
};

@Injectable()
export class MaterialsListContainerStore extends ComponentStore<MaterialsListState> {
  private readonly materialsFacade = inject(materialsFacade);
  private readonly foldersFacade = inject(foldersFacade);
  private readonly dialog = inject(MatDialog);
  public readonly materials$ = this.select(({ materials }) => materials);
  public readonly status$ = this.select(this.materialsFacade.materialsStatus$, (status) => status);
  public readonly errors$ = this.select(this.materialsFacade.MaterialsError$, (error) => error);

  constructor() {
    super(initialState);
    this.foldersFacade.init();
    this.materialsFacade.init();
    this.setMaterialsFromGlobalToLocalStore();
  }

  private setMaterialsFromGlobalToLocalStore(): void {
    this.effect(() =>
      this.materialsFacade.allMaterials$.pipe(tap((materials: MaterialsType[]) => this.patchMaterials(materials)))
    );
  }

  private patchMaterials(materials: MaterialsType[]): void {
    this.patchState({
      materials: materials.map((material) => MaterialsVMAdapter.entityToVM(material)),
    });
  }

  public deleteMaterial(material: MaterialsVM): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить файл "${material.title}"?` },
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
