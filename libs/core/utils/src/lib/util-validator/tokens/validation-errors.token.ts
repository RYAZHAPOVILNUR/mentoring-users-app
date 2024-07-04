import { InjectionToken } from '@angular/core';
import { ValidationErrorsKey } from '../enums/validation-errors-key.enum';

export const VALIDATION_ERRORS = new InjectionToken<{ [key in ValidationErrorsKey]: string }>('errors');