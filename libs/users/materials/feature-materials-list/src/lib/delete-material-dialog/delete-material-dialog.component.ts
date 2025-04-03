import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MaterialsFacade } from '@users/materials/data-access';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-delete-material-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './delete-material-dialog.component.html',
  styleUrls: ['./delete-material-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteMaterialDialogComponent {
  public readonly data = inject(MAT_DIALOG_DATA);
  private readonly materialFacade = inject(MaterialsFacade);

  onDelete(id: number) {
    this.materialFacade.deleteMaterial(id);
  }
}
