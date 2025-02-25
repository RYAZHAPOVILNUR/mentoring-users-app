import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FolderInterface, FoldersFacade, MaterialInterface } from '@users/materials/data-access';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'users-materials-card-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './materials-card-delete-dialog.component.html',
  styleUrls: ['./materials-card-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardDeleteDialogComponent {
  private readonly foldersFacade = inject(FoldersFacade)

  constructor(public dialogRef: MatDialogRef<MaterialsCardDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { material: MaterialInterface }) {}

  onDelete(materialFolderId: number) {
    this.foldersFacade.deleteMaterialFolder(materialFolderId);
    this.dialogRef.close()
  }

  cancel() {
    this.dialogRef.close()
  }
}
