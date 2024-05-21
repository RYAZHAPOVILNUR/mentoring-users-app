import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule,
    MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
})
export class FoldersAddDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<FoldersAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      folderName: string;
    },
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
