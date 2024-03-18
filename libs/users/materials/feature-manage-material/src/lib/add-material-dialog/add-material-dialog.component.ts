import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreateMaterialWithoutFolderId } from '@users/materials-data-access';

@Component({
  selector: 'users-add-material-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './add-material-dialog.component.html',
  styleUrls: ['./add-material-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMaterialDialogComponent {
  private fb = inject(FormBuilder);
  public readonly materialType = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<AddMaterialDialogComponent>);

  public formGroup = this.fb.group({
    title: ['', Validators.required],
    link: ['', Validators.required],
  });

  public save() {
    if (this.formGroup.valid && this.formGroup.value.title && this.formGroup.value.link) {
      const data: CreateMaterialWithoutFolderId = {
        title: this.formGroup.value.title.trim(),
        material_link: this.formGroup.value.link.trim(),
      };
      this.dialogRef.close(data);
    }
  }
}
