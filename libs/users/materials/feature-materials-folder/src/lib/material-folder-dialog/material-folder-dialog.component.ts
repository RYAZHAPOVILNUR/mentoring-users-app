import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'users-material-folder-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './material-folder-dialog.component.html',
  styleUrls: ['./material-folder-dialog.component.scss'],
})
export class MaterialFolderDialogComponent {
  private dialogRef = inject(MatDialogRef<MaterialFolderDialogComponent>);

  public folderName = '';

  public create(): void {
    this.dialogRef.close(this.folderName);
  }

  public cancel(): void {
    this.dialogRef.close(null);
  }
}
