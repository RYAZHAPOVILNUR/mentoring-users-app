import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { CreateFolder } from '@users/data-access-folders';

@Component({
  selector: 'users-folders-add-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './folders-add-dialog.component.html',
  styleUrl: './folders-add-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddDialogComponent {
  private readonly dialogRef = inject(MatDialogRef);
  public folderName: string = '';

  onSubmit() {
    if (!this.folderName) {
      return;
    }
    const folder: CreateFolder = { title: this.folderName };
    this.dialogRef.close(folder);
  }

  cancelDialog() {
    this.dialogRef.close();
  }
}
