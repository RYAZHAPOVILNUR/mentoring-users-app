import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatInputModule,
    ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersAddDialogComponent {
  private fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef);
  public data: { name: string } = inject(MAT_DIALOG_DATA);

  public readonly foldersFormGroup = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)]]
  });

  public onSave(): void {
    if (this.foldersFormGroup.valid) {
      const formData = {
        title: this.foldersFormGroup.value.title?.trim() || ''
      };
      this.dialogRef.close(formData);
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
