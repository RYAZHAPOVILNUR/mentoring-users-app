import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MaterialFileType } from './material-file-type';
import { regexFileType } from './material-type-regex';

export function linkValidator(data: MaterialFileType): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    switch (data) {
      case MaterialFileType.Video:
        if(regexFileType.video.test(control.value)) return null;
        break;
      case MaterialFileType.Pdf:
        if(regexFileType.pdf.test(control.value)) return null;
        break;
      case MaterialFileType.Audio:
        if(regexFileType.audio.test(control.value)) return null;
        break;
    }
    return {error: 'Validation failed'};
  }
}
