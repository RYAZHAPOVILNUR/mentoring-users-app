import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICreateMaterial, MaterialsFacade } from '@users/materials/data-access';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule, MatMenuModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
})
export class MaterialsAddButtonComponent {
  public dialog = inject(MatDialog);
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);
  private readonly snackBar = inject(MatSnackBar);

  private materialsTitle!: string;
  private materialLink!: string;

  public openAddMaterialDialog(materialType: string): void {
    const dialogRef: MatDialogRef<MaterialsAddDialogComponent> = this.dialog.open(MaterialsAddDialogComponent, {
      data: {
        materialType: materialType,
        materilsTitle: this.materialsTitle,
        materialLink: this.materialLink,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.snackBar.open('файл успешно добавлен!', 'Закрыть', { duration: 4000 });
          const newMaterialData: ICreateMaterial = {
            title: result.materialsTitle,
            material_link: result.materialLink,
            folder_id: result.folder_id,
          };
          this.materialsFacade.addMaterial(newMaterialData);
        }
      });
  }
}
