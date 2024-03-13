import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-delete-folder-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './delete-folder-dialog.component.html',
  styleUrls: ['./delete-folder-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteFolderDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<DeleteFolderDialogComponent>);
  public readonly dialogData = inject(MAT_DIALOG_DATA);

  public delete() {
    console.log('click delete yes');
    console.log('click delete yes', this.dialogData);
    this.dialogRef.close(this.dialogData.id);
  }
}
