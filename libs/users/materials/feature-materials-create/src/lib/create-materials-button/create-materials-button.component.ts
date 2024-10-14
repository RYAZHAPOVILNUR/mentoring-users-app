import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateMaterialsDialogComponent } from '../create-materials-dialog/create-materials-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { materialsFacade } from '@users/materials/data-access';
import { CreateMaterialDTO, MaterialFileType } from '@users/core/data-access';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'users-create-materials-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule, MatMenuModule],
  templateUrl: './create-materials-button.component.html',
  styleUrls: ['./create-materials-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMaterialsButtonComponent {
  public dialog = inject(MatDialog);
  private readonly materialsFacade = inject(materialsFacade);
  private readonly destroyRef = inject(DestroyRef);
  public readonly fileType = MaterialFileType;

  openAddMaterialDialog(fileType: MaterialFileType): void {
    const dialogRef: MatDialogRef<CreateMaterialsDialogComponent> = this.dialog.open(CreateMaterialsDialogComponent, {
      data: fileType,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const newMaterialData: CreateMaterialDTO = {
            title: result.title,
            material_link: result.link,
          };

          this.materialsFacade.addMaterial(newMaterialData);
        }
      });
  }
}