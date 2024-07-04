import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationErrorsKey } from '@users/core/utils';

@Injectable({ providedIn: 'root' })
export class ErrorMessageService {
  getErrorMessage(control: AbstractControl, errors: { [key in ValidationErrorsKey]: string }): string {
    if (!control?.touched) return '';

    if (control?.hasError(ValidationErrorsKey.MIN_LENGTH))
      return this.getMinLengthError(control, errors);

    const key = Object.values(ValidationErrorsKey).find(
      (key) => control?.hasError(key)
    );
    if (!key) return '';

    return errors[key] ?? '';
  }

  private getMinLengthError(control: AbstractControl, errors: { [key in ValidationErrorsKey]: string }): string {
    if (!control.errors) return '';
    const { actualLength, requiredLength } = control.errors[ValidationErrorsKey.MIN_LENGTH];

    return errors[ValidationErrorsKey.MIN_LENGTH] +
      `, сейчас: ${actualLength} символов, нужно: ${requiredLength}`;
  }
}