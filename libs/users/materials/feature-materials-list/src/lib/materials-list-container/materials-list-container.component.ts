import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { FoldersListUiComponent } from '@users/materials/feature-folders-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Material, MaterialsFacade } from '@users/materials/data-access';
import { MaterialsListUiComponent } from '../materials-list-ui/materials-list-ui.component';
import { filter, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { AddMaterialDialogUiComponent } from '../add-material-dialog-ui/add-material-dialog-ui.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,
    FoldersListUiComponent,
    MatButtonModule, MatIconModule,
    MaterialsListUiComponent, MatMenuModule
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsListContainerComponent {
  readonly materialsFacade = inject(MaterialsFacade);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  // todo this.folderId не должен существовать, у селекторов и у эффектов
  //  есть доступ к queryParams (routeParams), они справятся без передачи ненужных данных!
  readonly folderId: number | undefined = Number(this.activatedRoute.snapshot.params['id']);

  constructor() {
    this.loadMaterialsByFolderId();
    this.deleteMaterialHandler();
  }

  private loadMaterialsByFolderId(): void {
    // if (!this.isCorrectFolderId)
    if (!this.folderId) return; // todo this.folderId
    this.materialsFacade.loadMaterials(this.folderId); // todo this.folderId
  }

  private deleteMaterialHandler(): void {
    this.materialsFacade.deleteMaterial$.pipe(
      tap((id) => this.materialsFacade.deleteMaterial(id)),
      takeUntilDestroyed()
    ).subscribe();
  }

  onAddButtonClick(): void {
    if (!this.folderId) return; // todo this.folderId

    const dialogRef = this.dialog
      .open<AddMaterialDialogUiComponent, number, Partial<Material>>(
        AddMaterialDialogUiComponent,
        { data: this.folderId } // todo this.folderId
      );

    dialogRef.afterClosed().pipe(
      filter(Boolean),
      tap((material) => this.materialsFacade.createMaterial(material)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

}
