import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMaterial, MaterialsFacade } from '@users/materials/data-access';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  imports: [CommonModule, MatProgressBarModule, MaterialsListComponent, LetDirective],
})
export class MaterialsListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);

  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  public readonly materialsStatus$ = this.materialsFacade.materialsStatus$;
  public readonly allMaterials$ = this.materialsFacade.allMaterials$;
  public readonly openedFolder$ = this.materialsFacade.openedFolder$;

  constructor() {
    this.materialsFacade.loadMaterials();
  }

  public deleteMaterial(material: IMaterial): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${material.title}` },
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((result: boolean) => {
          if (result) this.materialsFacade.deleteMaterials(material.id);
        })
      )
      .subscribe();
  }

  public backOnFolders() {
    this.router.navigate(['/materials']);
  }
}
