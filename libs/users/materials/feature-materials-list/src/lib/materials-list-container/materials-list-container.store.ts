import { DeepReadonly } from '../../../../../../core/utils/src';
import { MaterialsDTO } from '../../../../../../core/data-access/src/lib/materials-dto.model';
import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { MaterialsFacade } from '@users/materials/data-access';
import { shareReplay, switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '../../../../../../core/ui/src';


type MaterialsListState = DeepReadonly<{
  materials: MaterialsDTO[];
  filteredMaterials: MaterialsDTO[];
}>;

const initialState: MaterialsListState = {
  materials: [],
  filteredMaterials: []
};

@Injectable()
export class MaterialsListContainerStore extends ComponentStore<MaterialsListState> {
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly materials$ = this.select(({ materials }) => materials);
  public readonly status$ = this.select(this.materialsFacade.status$, (status) => status);
  public errors$ = this.select(this.materialsFacade.error$, (error) => error);
  public readonly filteredMaterials$ = this.select(({filteredMaterials}) => filteredMaterials);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  constructor() {
    super(initialState);
    this.setMaterialsFromGlobalToLocalStore();
    this.filterMaterialsByFolderId();
  }

  private setMaterialsFromGlobalToLocalStore(): void {
    this.effect(() => this.materialsFacade.allMaterials$.pipe(tap((materials: MaterialsDTO[]) => this.patchState({materials: materials})),
      shareReplay(1) ));
  }

  private filterMaterialsByFolderId(): void {
    this.effect(() => this.route.params.pipe(
      switchMap(params => {
        const folderId = params['id'];
        console.log(folderId)// Получаем id папки из параметров маршрута
        return this.materials$.pipe(
          tap(materials => {
            const filteredMaterials = materials.filter(material => material.folder_id === +folderId);
            this.patchState({ filteredMaterials });
          })
        );
      })
    ));
  };

  deleteMaterial(material: MaterialsDTO): void {
    console.log(material);
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${material.title}` },
    })

    this.effect(() =>
      dialogRef.afterClosed().pipe(
        tap((result: boolean) => {
          if (result) this.materialsFacade.deleteMaterial(material);
        })
      )
    );
  }
}
