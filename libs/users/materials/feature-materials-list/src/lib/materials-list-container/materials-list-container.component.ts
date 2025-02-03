import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, Output, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MaterialsAddButtonComponent } from '@users/feature-materials-create';
import { MaterialsFacade } from '@users/materials/data-access';
import { IMaterial } from 'libs/users/materials/data-access/src/lib/models/materials.model';
import { MaterialsListComponent } from '../materials-list/materials-list.component';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsAddButtonComponent,
    MaterialsListComponent,
    LetDirective,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);

  public materials$ = this.materialsFacade.materialsByFolder$;
  public openedFolder$ = this.materialsFacade.openedFolder$;
  public status$ = this.materialsFacade.foldersStatus$;
  public errors$ = this.materialsFacade.foldersErrors$;
  public folderId$ = this.materialsFacade.selectedFolderId$;

  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  @Output()
  openedFolderId: number | undefined = 0;

  ngOnInit(): void {
    this.materialsFacade.loadFolder();
    this.materialsFacade.initMaterials();
    this.openedFolder$.subscribe((folder) => (this.openedFolderId = folder?.id));
  }

  onDeleteMaterial(material: IMaterial) {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: {
        dialogText: `Вы уверены, что хотите удалить этот материал ${material.title}?`,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.materialsFacade.deleteMaterial(material.id);
        }
      });
  }
}
