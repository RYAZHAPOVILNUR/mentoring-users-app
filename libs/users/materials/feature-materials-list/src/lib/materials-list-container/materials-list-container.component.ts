import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MaterialsFacade, TMaterialDTO } from '@users/materials/data-access';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { LetDirective, PushPipe } from '@ngrx/component';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { selectRouteParams } from '@users/core/data-access';
import { MaterialsCreateButtonComponent } from '@users/materials/feature-materials-create';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsContentComponent } from '@users/materials/feature-materials-content';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,
    MaterialsListComponent,
    MaterialsCreateButtonComponent,
    MatIconModule,
    PushPipe,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
})
export class MaterialsListContainerComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public readonly folderTitle$ = this.route.paramMap.pipe(
    map(() => {
      const historyState = window.history.state;
      return historyState.folderTitle && typeof historyState.folderTitle === 'string'
        ? historyState.folderTitle
        : 'Папка'
    })
  );
  public readonly error$ = this.materialsFacade.error$;
  public readonly status$ = this.materialsFacade.status$;
  public readonly materialsAll$ = this.materialsFacade.materialsAll$.pipe(
    tap(materials => {
      if (materials.length === 0) {
        this.materialsFacade.loadMaterials();
      }
    }),
    withLatestFrom(this.store.select(selectRouteParams)),
    map(([materialsAll, params]) => materialsAll.filter((material) => material.folder_id === Number(params['id']))),
  );

  public onDeleteMaterial(material: TMaterialDTO): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${material.title}` },
    });
    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((result: boolean) => {
        if (result) this.materialsFacade.deleteMaterial(material);
      }),
    ).subscribe();
  }

  public onRiderectToFolders() {
    this.router.navigateByUrl('/materials');
  }

  public onOpenMaterial(material: TMaterialDTO): void {
    this.dialog.open(MaterialsContentComponent, {
      data: { material }
    });
  }
}
