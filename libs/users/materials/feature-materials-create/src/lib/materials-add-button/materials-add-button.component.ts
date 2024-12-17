import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { IAddMaterial, MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly materialsFacade = inject(MaterialsFacade);

  openDialogMaterial(typeMaterial: string): void {
    const dialogRef = this.dialog.open(MaterialsAddDialogComponent, {
      width: '300px',
      data: { typeMaterial },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const newMaterial: IAddMaterial = {
          title: result.materialTitle,
          material_link: result.materialLink,
        };
        this.materialsFacade.addMaterial(newMaterial);
      }
    });
  }
}
