import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { AddMaterialDTO, MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
})
export class MaterialsAddButtonComponent {
  public dialog = inject(MatDialog);

  // Initialize materialType with actual values
  public readonly materialType = {
    PDF: 'PDF',
    VIDEO: 'VIDEO',
    AUDIO: 'AUDIO',
  } as const;

  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);

  addOpenModel(fileType: keyof typeof this.materialType) {
    const dialogRef: MatDialogRef<
      MaterialsAddDialogComponent
    > = this.dialog.open<MaterialsAddDialogComponent, string, AddMaterialDTO>(
      MaterialsAddDialogComponent,
      {
        data: fileType,
      }
    );

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const newMaterialData: AddMaterialDTO = {
            title: result.title,
            material_link: result.material_link,
          };

          this.materialsFacade.addMaterial(newMaterialData);

        };
      });
  }
}
