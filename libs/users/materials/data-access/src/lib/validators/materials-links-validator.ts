import { MaterialFileType } from '../constants-enums/materials-enums';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { regexMaterials } from '../constants-enums/materials-regex';

export function materialLinkValidator(data: MaterialFileType): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const trimmedValue = control.value?.trim().replace(/\s+/g, ' ');
    switch (data) {
      case MaterialFileType.video:
        if (regexMaterials.video.test(trimmedValue)) return null;
        break;
      case MaterialFileType.pdf:
        if (regexMaterials.pdf.test(trimmedValue)) return null;
        break;
      case MaterialFileType.audio:
        if (regexMaterials.audio.test(trimmedValue)) return null;
        break;
    }
    return { error: 'Error' };
  };
}
