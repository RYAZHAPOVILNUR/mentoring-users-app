import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-folder-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './folder-dialog.component.html',
  styleUrls: ['./folder-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderDialogComponent {
  private formBuilder = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<FolderDialogComponent>);

  public formGroup: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
  });
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; created_at: string; id: number }){}

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.formGroup.valid) {
      const formData = {
        id: Math.random(),
        title: this.formGroup.value.title,
        created_at: new Date().toString(),
      };
      this.dialogRef.close(formData);
    }
  }
}
