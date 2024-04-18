import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function urlFileValidator(type: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const url = control.value;
    if (!url) return null;

    let isMp3;
    let isPdf;

    if (type === 'audio') {
      isMp3 = url.toLowerCase().endsWith('.mp3');
    } else {
      isPdf = url.toLowerCase().endsWith('.pdf');
    }

    return isMp3 || isPdf
      ? null
      : type !== 'audio' && type !== 'pdf'
      ? null
      : {
          invalidUrl: type === 'audio' ? 'ссылка не является .mp3' : type === 'pdf' ? 'ссылка не является .pdf' : '',
        };
  };
}
