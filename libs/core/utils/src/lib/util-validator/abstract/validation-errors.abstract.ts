import { AbstractControl } from '@angular/forms';
import { inject } from '@angular/core';
import { VALIDATION_ERRORS } from '../tokens/validation-errors.token';
import { ErrorMessageService } from '../services/validation-error-message.service';

export abstract class ValidationErrors {
  abstract control?: AbstractControl;
  private readonly validationErrors = inject(VALIDATION_ERRORS);
  private readonly methods = inject(ErrorMessageService);

  get errorMessage(): string {
    if (!this.control) return '';

    return this.methods.getErrorMessage(this.control, this.validationErrors);
  }
}