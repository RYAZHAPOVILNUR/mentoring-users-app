import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { DeepReadonly } from '@users/core/utils';
import { tap } from 'rxjs';
import { MaterialsEntity } from '@users/core/data-access';
import { MaterialsFacade } from '@libs/users/materials/state';
import { materialsVMAdapter } from '../../../../materials-vm.adapter';
import { MaterialsVM } from '../../../../materials-vm';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { EditMaterialsDialogComponent } from '@users/materials/feature-materials-edit';

type MaterialsListState = DeepReadonly<{
  materials: MaterialsVM[];
}>;

const initialState: MaterialsListState = {
  materials: [],
};

@Injectable()
export class MaterialsListContainerStore extends ComponentStore<MaterialsListState> {
  private readonly dialog = inject(MatDialog);
  private readonly materialsFacade = inject(MaterialsFacade);

  public readonly materials$ = this.select(({ materials }) => materials);
  public readonly status$ = this.select(this.materialsFacade.status$, (status) => status);
  public readonly errors$ = this.select(this.materialsFacade.errors$, (error) => error);
  public readonly folderId$ = this.select(this.materialsFacade.folderId$, (id) => {
    if (typeof id === 'string') return +id;
    return undefined;
  });
  public readonly folderTitle$ = this.select(this.materialsFacade.folderTitle$, (title) => title);
  public readonly materialById$ = this.select(this.materialsFacade.materialById$, (materialById) => materialById);

  constructor() {
    super(initialState);
    this.materialsFacade.init();
    this.setMaterialsFromGlobalToLocalStore();
  }

  private setMaterialsFromGlobalToLocalStore(): void {
    this.effect(() =>
      this.materialsFacade.allMaterials$.pipe(tap((materials: MaterialsEntity[]) => this.patchMaterials(materials)))
    );
  }

  private patchMaterials(materials: MaterialsEntity[]): void {
    this.patchState({
      materials: materials.map((material) => materialsVMAdapter.entityToVM(material)),
    });
  }

  public deleteMaterial({ materialId, materialTitle }: { materialId: number; materialTitle: string }): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить "${materialTitle}"?` },
    });
    this.effect(() =>
      dialogRef.afterClosed().pipe(
        tap((result: boolean) => {
          if (result) this.materialsFacade.deleteMaterial(materialId);
        })
      )
    );
  }

  public editMaterial(material: MaterialsEntity): void {
    const dialogRef: MatDialogRef<EditMaterialsDialogComponent> = this.dialog.open(EditMaterialsDialogComponent, {
      data: {
        dialogText: `Переименовать`,
        materialData: material,
      },
    });
    this.effect(() =>
      dialogRef.afterClosed().pipe(
        tap((formData: MaterialsEntity) => {
          if (formData) this.materialsFacade.editMaterial(formData);
        })
      )
    );
  }

  public openMaterial(material: MaterialsEntity) {
    this.materialsFacade.openMaterial(material);
  }
}
