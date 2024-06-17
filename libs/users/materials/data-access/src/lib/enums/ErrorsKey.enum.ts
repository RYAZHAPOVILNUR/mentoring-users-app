import { InjectionToken } from '@angular/core';

export enum ErrorsKey {
  REQUIRED = 'required',
  MIN_LENGTH = 'minlength',
  PATTERN = 'pattern',
}

export const ERRORSS = new InjectionToken<{ [key in ErrorsKey]: string }>('errors');
