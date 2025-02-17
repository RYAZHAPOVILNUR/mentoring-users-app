import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMaterialDTO, MaterialsFacade } from '@users/materials/data-access';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  @Input() folder_id!: string;

  private title!: string;
  private readonly materialFacade = inject(MaterialsFacade);
  readonly dialog = inject(MatDialog);

  OpenDialog(folder_id: string): void {
    const dialogRef = this.dialog.open(MaterialsAddDialogComponent, {
      data: { title: this.title, folder_id: folder_id }
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          const newMaterialData: CreateMaterialDTO = {
            title: result.title,
            material_link: result.material_link,
            folder_id: result.folder_id,
          };
          this.materialFacade.addMaterial(newMaterialData);
        }
      });
  };
}
