import { DestroyRef, inject, Injectable } from "@angular/core";
import { DeepReadonly } from "@users/core/utils";
import { FoldersFacade, MaterialsEntity, MaterialsFacade, MaterialsVM, materialsVMAdapter } from "@users/materials/data-access";
import { ComponentStore } from "@ngrx/component-store";
import { tap } from "rxjs";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CoreUiConfirmDialogComponent } from "@users/core/ui";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

type MaterialsListState = DeepReadonly<{
  materials: MaterialsVM[];
}>;
  
const initialState: MaterialsListState = {
  materials: [],
};

@Injectable()
export class MaterialsListContainerStore extends ComponentStore<MaterialsListState> {
  
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly foldersFacade = inject(FoldersFacade);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public readonly status$ = this.select(this.materialsFacade.materialsStatus$, (status) => status);
  public readonly errors$ = this.select(this.materialsFacade.error$, (error) => error);
  public readonly folderId$ = this.select(this.materialsFacade.folderId$, (id) => {
    if (typeof id === 'string') return +id;
    return undefined;
  });
  public readonly openedFolder$ = this.select(this.foldersFacade.openedFolder$, (openedFolder) => openedFolder);

  constructor() {
    super(initialState);
    this.materialsFacade.initMaterials();
    this.setMaterialsFromGlobalToLocalStore();
  }

  private setMaterialsFromGlobalToLocalStore(): void {
    this.effect(() =>
      this.materialsFacade.allMaterials$
      .pipe(tap((materials: MaterialsEntity[]) => this.patchMaterials(materials)))
    );
  }

  private patchMaterials(materials: MaterialsEntity[]): void {
    this.patchState({
      materials: materials.map((material) => materialsVMAdapter.entityToVM(material)),
    });
  }

  public deleteMaterial(material: MaterialsVM): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(
      CoreUiConfirmDialogComponent,
      { data: { dialogText: `Вы уверены, что хотите удалить ${material.title}` } }
    )

    dialogRef.afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((result: boolean) => {
          if(result) this.materialsFacade.deleteMaterial(material.id)
        })
      )
      .subscribe()
  }  

}      