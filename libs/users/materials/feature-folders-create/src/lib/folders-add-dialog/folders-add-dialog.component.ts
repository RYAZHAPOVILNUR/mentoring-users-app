import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddDialogComponent {
  readonly dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>);

  public formGroup = new FormGroup({
    folder: new FormControl('', Validators.required),
  });

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onSave(): void {
    if (this.formGroup.valid) {
      const newFolder = {
        folderTitle: this.formGroup.value.folder,
      };

      this.dialogRef.close(newFolder);
    }
  }
}
