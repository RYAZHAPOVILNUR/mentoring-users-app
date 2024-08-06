import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateFolder } from '@users/material';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-folder-add-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule],
  templateUrl: './folder-add-dialog.component.html',
  styleUrls: ['./folder-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderAddDialogComponent {
  private formBuilder = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<FolderAddDialogComponent>);
  public data: CreateFolder = inject(MAT_DIALOG_DATA);
  public formGroup: FormGroup;

  constructor() {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public create(): void {
    if (this.formGroup.valid) {
      const dataFolder = {
        title: this.formGroup.value.title,
      };
      this.dialogRef.close(dataFolder);
    }
  }
}
