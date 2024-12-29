import { MaterialFileType } from '../constants-enums/materials-enums';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { materialsValidation } from '../constants-enums/materials-validation';

export function material_linkValidator(data: MaterialFileType): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const trimmedValue = control.value?.trim().replace(/\s+/g, ' ');
    switch (data) {
      case MaterialFileType.video:
        if (materialsValidation.video.test(trimmedValue)) return null;
        break;
      case MaterialFileType.pdf:
        if (materialsValidation.pdf.test(trimmedValue)) return null;
        break;
      case MaterialFileType.audio:
        if (materialsValidation.audio.test(trimmedValue)) return null;
        break;
    }
    return { error: 'Error' };
  };
}