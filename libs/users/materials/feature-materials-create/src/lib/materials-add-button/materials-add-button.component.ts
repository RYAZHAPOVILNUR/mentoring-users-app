import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialFileType } from 'libs/users/materials/data-access/src/lib/constant-enums/materials-enums';
import { materialsFacade } from 'libs/users/materials/data-access/src/lib/+state-materials/materials.facade';
import { AddMaterialsType } from 'libs/users/materials/data-access/src/lib/models/materials.type';

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
  private readonly destroyRef = inject(DestroyRef);
  private readonly materialsFacade = inject(materialsFacade);
  public readonly MaterialFileType = MaterialFileType;

  public openDialog(data: MaterialFileType) {
    const dialogRef = this.dialog.open(MaterialsAddDialogComponent, {
      width: '400px',
      height: '310px',
      data,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const newMaterial: AddMaterialsType = {
            title: result.title,
            material_link: result.link,
          };
          this.materialsFacade.addMaterial(newMaterial);
        }
      });
  }
}
