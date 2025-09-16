import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatError } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';

import { PasswordFieldComponent } from '@shared/feature-password-field';

import { PasswordChangeDialogCloseData } from '../password-change-dialog-close-data.interface';

type DialogRef = MatDialogRef<PasswordChangeDialogComponent, PasswordChangeDialogCloseData>;

@Component({
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatError,
    MatButtonModule,
    MatDialogModule,
    TranslateModule,
    PasswordFieldComponent,
  ],
  templateUrl: './password-change-dialog.component.html',
  styleUrls: ['./password-change-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordChangeDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject<DialogRef>(MatDialogRef);

  readonly formGroup = this.fb.nonNullable.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    confirmNewPassword: ['', [Validators.required]],
  });

  onFormSubmit(): void {
    if (!this.isFormValid()) {
      return;
    }

    this.dialogRef.close(this.formGroup.getRawValue());
  }

  private isFormValid(): boolean {
    const { newPassword, confirmNewPassword } = this.formGroup.getRawValue();

    return newPassword === confirmNewPassword;
  }
}
