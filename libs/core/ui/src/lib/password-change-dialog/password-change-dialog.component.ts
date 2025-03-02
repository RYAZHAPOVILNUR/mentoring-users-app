import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InputPasswordComponent } from '../input-password/input-password.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { PushPipe } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'password-change-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    InputPasswordComponent,
    MatTooltipModule,
    PushPipe,
    TranslateModule
  ],
  templateUrl: './password-change-dialog.component.html',
  styleUrls: ['./password-change-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordChangeDialogComponent {
  public dialogRef = inject(MatDialogRef<PasswordChangeDialogComponent>);
  public formGroup = new FormBuilder().group({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmNewPassword: new FormControl('', [Validators.required])
  });
  public passwordsMatch$ = new BehaviorSubject(true);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.checkPasswordMatch();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  checkPasswordMatch() {
    this.formGroup.controls.confirmNewPassword
      .valueChanges
      .pipe(
        debounceTime(500),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.passwordsMatch$.next(this.formGroup.value.newPassword === this.formGroup.value.confirmNewPassword);
      });
  }

}
