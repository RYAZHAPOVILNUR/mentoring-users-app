import { TranslateService } from '@ngx-translate/core';
import { ValidationErrorsKey } from '../enums/validation-errors-key.enum';

export function validationErrorsFactory(translateService: TranslateService): { [key in ValidationErrorsKey]: string } {
  return {
    required: translateService.instant('MATERIALS.VALIDATION_REQUIRED'),
    minlength: translateService.instant('MATERIALS.VALIDATION_MIN_LENGTH'),
    pattern: translateService.instant('MATERIALS.VALIDATION_PATTERN')
  };
}