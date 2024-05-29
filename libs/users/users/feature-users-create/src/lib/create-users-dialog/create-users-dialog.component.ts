import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-create-users-dialog',
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
  templateUrl: './create-users-dialog.component.html',
  styleUrls: ['./create-users-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUsersDialogComponent {
  private dialogRef = inject(MatDialogRef<CreateUsersDialogComponent>);

  public readonly formGroup = new FormGroup({
    name: new FormControl<string>('', { nonNullable : true, validators: [Validators.required, Validators.maxLength(18)] }),
    email: new FormControl<string>('', { nonNullable : true,validators: [Validators.required, Validators.email] }),
  });

  public cancel(): void {
    this.dialogRef.close();
  }

  public save(): void {
    if (this.formGroup.valid) {
      const formData = {
        name: this.formGroup.getRawValue().name,
        email: this.formGroup.getRawValue().email.trim().toLowerCase(),
      };
      this.dialogRef.close(formData);
    }
  }
}
