import { ChangeDetectionStrategy, Component, DestroyRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddMaterialType, EMaterialFile, MaterialsFacade } from '@users/materials/data-access';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule, MatTooltipModule, MaterialsAddDialogComponent],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly eMaterialFile = EMaterialFile;

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  openMaterialDialog(eMaterial: EMaterialFile): void {
    const dialogRef: MatDialogRef<MaterialsAddDialogComponent> = this.dialog.open(MaterialsAddDialogComponent, {
      data: eMaterial,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const newMaterial: AddMaterialType = {
            title: result.title,
            material_link: result.link,
          };

          this.materialsFacade.addMaterials(newMaterial);
        }
      });
  }
}
