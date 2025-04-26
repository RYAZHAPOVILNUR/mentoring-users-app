import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddDialogComponent {
  private formBuilder = inject(FormBuilder);
  public formGroup = this.formBuilder.group({
    title: ['', Validators.required],
  });
  readonly dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>);

  public onClose(): void {
    this.dialogRef.close();
  }

  public onSave(): void {
    if (this.formGroup.valid) {
      const formData = {
        title: this.formGroup.value.title,
      };
      this.dialogRef.close(formData);
    }
  }
}
