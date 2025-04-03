import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MaterialsEntity, MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-delete-material-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './delete-material-dialog.component.html',
  styleUrls: ['./delete-material-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteMaterialDialogComponent {
  public readonly data = inject(MAT_DIALOG_DATA);
  private readonly materialFacade = inject(MaterialsFacade);

  onDelete(data: MaterialsEntity) {
    this.materialFacade.deleteMaterial(data.id);
  }
}
