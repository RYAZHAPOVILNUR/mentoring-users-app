import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TAddMaterial, MaterialsFacade } from '@users/materials/data-access';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { MaterialFileType } from '@users/materials/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule, MatDialogModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly MaterialsFacade = inject(MaterialsFacade);
  public readonly MaterialFileType = MaterialFileType;

  public openAddDialog(data: MaterialFileType) {
    const dialogRef = this.dialog.open(MaterialsAddDialogComponent, {
      height: '300px',
      width: '500px',
      data,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed())
      .subscribe((result) => {
        if (result) {
          const newMaterial: TAddMaterial = {
            title: result.title,
            material_link: result.link,
          };
          this.MaterialsFacade.addMaterials(newMaterial);
        }
      });
  }
}
