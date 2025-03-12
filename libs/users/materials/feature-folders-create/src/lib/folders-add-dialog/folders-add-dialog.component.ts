import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddDialogComponent {
  private readonly fb = inject(FormBuilder)
  public readonly formGroup: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
  });
  private readonly dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>);
  private readonly data: { dialogTitle: string } = inject(MAT_DIALOG_DATA);
  public readonly dialogTitle: string = this.data.dialogTitle;

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
      this.dialogRef.close(formData);
    }
  }
}
