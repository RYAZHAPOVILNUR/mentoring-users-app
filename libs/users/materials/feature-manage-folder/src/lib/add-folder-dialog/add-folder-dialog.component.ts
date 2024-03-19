import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-add-folder-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './add-folder-dialog.component.html',
  styleUrls: ['./add-folder-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFolderDialogComponent {
  private readonly _dialogRef = inject(MatDialogRef<AddFolderDialogComponent>);
  public folderName: FormControl = new FormControl('', Validators.required);

  public save() {
    if (this.folderName.value && this.folderName.valid) {
      this._dialogRef.close(this.folderName.value.trim());
    }
  }
}
