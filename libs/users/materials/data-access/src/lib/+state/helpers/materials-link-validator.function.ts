import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { regexMaterials } from '../constants/materials-regex.constant';
import { EMaterialFile } from '../enums/materials-file.enum';

export function materialLinkValidator(data: EMaterialFile): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    switch (data) {
      case EMaterialFile.video:
        if (regexMaterials.video.test(control.value)) return null;
        break;
      case EMaterialFile.pdf:
        if (regexMaterials.pdf.test(control.value)) return null;
        break;
      case EMaterialFile.audio:
        if (regexMaterials.audio.test(control.value)) return null;
        break;
    }
    return { error: 'Error' };
  };
}
