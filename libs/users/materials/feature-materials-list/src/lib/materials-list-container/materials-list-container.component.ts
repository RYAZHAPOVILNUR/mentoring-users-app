import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialType, MaterialsFacade } from '@users/materials/data-access';
import { Router } from '@angular/router';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { MaterialsAddButtonComponent } from '@users/materials/feature-materials-create';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LetDirective } from '@ngrx/component';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, MaterialsAddButtonComponent, MatProgressBarModule, LetDirective],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent implements OnInit {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  public readonly openedMaterial$ = this.materialsFacade.openedMaterial$;
  public readonly materialsStatus$ = this.materialsFacade.materialsStatus$;
  public readonly openedFolder$ = this.materialsFacade.openedFolder$;

  ngOnInit() {
    this.materialsFacade.loadMaterials();
  }

  public onBackToFolders(): void {
    this.router.navigate(['/materials']);
  }

  public onDeleteMaterial(material: MaterialType): void {
    const dialogRef = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Точно удалить ${material.title}?` },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.materialsFacade.deleteMaterials(material.id);
        }
      });
  }
}
