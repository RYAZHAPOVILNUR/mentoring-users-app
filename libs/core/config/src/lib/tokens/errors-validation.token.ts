import { InjectionToken } from '@angular/core';
import { ErrorsKey } from '@users/materials/data-access';

export const VALIDATION_ERRORS = new InjectionToken<{ [key in ErrorsKey]: string }>('errors');
