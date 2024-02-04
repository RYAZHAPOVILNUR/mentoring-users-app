import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersAddDialogComponent {
  private readonly dialogRef: MatDialogRef<FoldersAddDialogComponent> = inject(MatDialogRef);
  public readonly folderNameForm: FormControl = new FormControl('', Validators.required);

  saveNameFolder() {
    if (this.folderNameForm.valid) {
      const newFolderTitle = {
        title: this.folderNameForm.value
      };
      this.dialogRef.close(newFolderTitle);
    }
  }
}
