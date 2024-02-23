import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsFacade } from '../../../../data-access/src/lib/+state/materials.facade';
import { LetDirective } from '@ngrx/component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { AddMaterialModalComponent } from '../add-material-modal/add-material-modal.component';
import { ResourcesListComponent } from '../resources-list/resources-list.component';
import { MaterialsService } from '../../../../service/materialsService';
import { CoreUiConfirmDialogComponent } from '../../../../../../core/ui/src';
import { IDeleteItem } from '../../../../data-access/src/lib/models/models';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { getIdFromUrl } from '../../../../util/utils';
import { DELETE_ITEM_TYPE } from '../../../../util/constant';
import { BackNavButtonComponent } from '../../../../../../core/ui/src/lib/back-nav-button/back-nav-button.component';

@Component({
  selector: 'lib-resources-list-container',
  standalone: true,
  imports: [CommonModule, LetDirective, MatButtonModule, MatIconModule, ResourcesListComponent, MatSnackBarModule, BackNavButtonComponent],
  templateUrl: './resources-list-container.component.html',
  styleUrls: ['./resources-list-container.component.scss']
})
export class ResourcesListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  public dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  public readonly materials$ = this.materialsFacade.materials$;
  public readonly isLoadingMaterials$ = this.materialsFacade.isLoadingMaterials$;
  private materialService = inject(MaterialsService);
  private router = inject(Router);

  constructor() {
    this.materialsFacade.loadMaterials();

    this.materialService.deleteItem.pipe(
      tap((material: IDeleteItem): void => {
          if (!material.deleteId && material.type !== DELETE_ITEM_TYPE.MATERIAL) return;
          this.deleteMaterial(material);
        }
      )
    ).subscribe();
  }

  openAddMaterialDialog(): void {
    const addMaterialRef: MatDialogRef<AddMaterialModalComponent> = this.dialog.open(AddMaterialModalComponent);
    addMaterialRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(
        tap(({ title, material_link }): void => {
          if (!title || !material_link) return;
          this.materialsFacade.addNewMaterial({
            title,
            material_link,
            folder_id: getIdFromUrl(this.router.url)
          });
          this.materialService.openSnackBar(`Material ${title} was added`);
        })
      )
      .subscribe();
  }

  deleteMaterial(material: IDeleteItem): void {
    const deleteFolderRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Do you what to delete material ${material.title}?` }
    });
    deleteFolderRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(
        tap((confirmDelete) => {
          if (!confirmDelete) return;
          this.materialsFacade.deleteMaterial(material);
          this.materialService.openSnackBar(`Material ${material.title} was removed`);
          this.materialService.setZeroItem();
        })
      )
      .subscribe();
  }
}
