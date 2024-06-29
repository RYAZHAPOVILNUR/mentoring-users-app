import { Location } from "@angular/common";
import { DestroyRef, Injectable, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { ApiService } from "@users/core/http";
import { DeepReadonly } from "@users/core/utils";
import { Folder, MaterialsEntity, MaterialsFacade } from "@users/users/materials/data-access";
import { exhaustMap, filter, tap, withLatestFrom } from "rxjs";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsContentDialogComponent } from "@users/users/materials/feature-materials-content";
import { CoreUiConfirmDialogComponent } from "@users/core/ui";

type MaterialsListContainerState = DeepReadonly<{
  openedFolder: Folder | null,
}>;

const initialState: MaterialsListContainerState = {
  openedFolder: null,
};

type DeleteDialogRef = MatDialogRef<CoreUiConfirmDialogComponent, boolean>;

@Injectable()
export class MaterialsListContainerStore extends ComponentStore<MaterialsListContainerState> {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly location = inject(Location);
  private readonly apiService = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public readonly materials$ = this.select(this.materialsFacade.materials$, (materials) => materials);
  public readonly status$ = this.select(this.materialsFacade.materialsStatus$, (status) => status);
  public readonly error$ = this.select(this.materialsFacade.materialsError$, (error) => error);
  
  public readonly openedFolder$ = this.select((state) => state.openedFolder);

  constructor() {
    super(initialState);
    this.loadOpenedFolder();
    this.materialsFacade.loadMaterials();
  }

  private readonly setOpenedFolder = this.updater<Folder>((state, openedFolder) => ({
    ...state,
    openedFolder,
  }));

  public readonly loadOpenedFolder = this.effect(trigger$ => {
    return trigger$.pipe(
      withLatestFrom(this.route.params),
      exhaustMap(([, params]) => {
        return this.apiService.get<Folder>(`/folder/${params['id']}`).pipe(
          tapResponse(
            (openedFolder: Folder) => this.setOpenedFolder(openedFolder),
            (error: Error) => (function(error: Error) {
              console.error('Error: ', error);
            })(error)
          )
        )
      })
    )
  });

  public moveBack() {
    this.location.back();
  }

  public openMaterial(material: MaterialsEntity) {
    this.dialog.open(MaterialsContentDialogComponent, {data: material});
  }

  public deleteMaterial(material: MaterialsEntity) {
    const dialogRef: DeleteDialogRef = this.dialog.open(
      CoreUiConfirmDialogComponent,
      { data: { dialogText: `Вы уверены, что хотите удалить ${material.title}?` } }
    );
    this.effect(() => 
      dialogRef.afterClosed().pipe(
        filter(Boolean),
        tap(() => this.materialsFacade.deleteMaterial(material.id))
      )
    )
  }
}
