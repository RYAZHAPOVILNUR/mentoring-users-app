import { AbstractControl } from '@angular/forms';
import { inject, Injectable } from '@angular/core';
import { VALIDATION_ERRORS, ValidationErrorsKey } from '@users/config';

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

export abstract class ValidationErrors {
  abstract control?: AbstractControl;
  private readonly validationErrors = inject(VALIDATION_ERRORS);
  private readonly methods = inject(ErrorMessageService);
  // abstract sosatChlen: () => 'hyi';
  // validate(control: AbstractControl): void {
  //   this._control = control;
  // }
  // constructor(private readonly myControl: AbstractControl) {}

  get errorMessage(): string {
    if (!this.control) return '';

    return this.methods.getErrorMessage(this.control, this.validationErrors);
  }
}