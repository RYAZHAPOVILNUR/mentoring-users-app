import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentStore } from '@ngrx/component-store';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { DeepReadonly } from '@users/core/utils';
import { FoldersFacade, MaterialsFacade } from '@users/materials/data-access';
import { MaterialsVM } from 'libs/users/materials/view-models/materials-vm';
import { MaterialsType } from 'libs/users/settings/feature-change-theme/src/lib/style-manager/style-manager';
import { tap } from 'rxjs';
import { MaterialsVMAdapter } from '../../../../view-models/materials-vm.adapter';

type MaterialsListState = DeepReadonly<{
  materials: MaterialsType[];
}>;

const initialState: MaterialsListState = {
  materials: [],
};

@Injectable()
export class MaterialsListContainerStore extends ComponentStore<MaterialsListState> {
  private readonly MaterialsFacade = inject(MaterialsFacade);
  private readonly FoldersFacade = inject(FoldersFacade);
  private readonly dialog = inject(MatDialog);
  public readonly materials$ = this.select(({ materials }) => materials);
  public readonly status$ = this.select(this.MaterialsFacade.materialsStatus$, (status) => status);
  public readonly errors$ = this.select(this.MaterialsFacade.MaterialsError$, (error) => error);

  constructor() {
    super(initialState);
    this.FoldersFacade.init();
    this.MaterialsFacade.init();
    this.setMaterialsFromGlobalToLocalStore();
  }

  private setMaterialsFromGlobalToLocalStore(): void {
    this.effect(() =>
      this.MaterialsFacade.allMaterials$.pipe(tap((materials: MaterialsType[]) => this.patchMaterials(materials)))
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
          result && this.MaterialsFacade.deleteMaterial(material.id);
        })
      )
    );
  }
}