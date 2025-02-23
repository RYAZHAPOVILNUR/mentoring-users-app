import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

function detectFormat(link: string): 'Video' | 'Audio' | 'PDF' | 'Unknown' {
  if (/youtube\.com|youtu\.be/.test(link)) {
    return 'Video';
  } else if (/\.(mp3|wav|ogg)(\?.*)?$/i.test(link)) {
    return 'Audio';
  } else if (/\.(pdf)(\?.*)?$/i.test(link)) {
    return 'PDF';
  } else {
    return 'Unknown';
  }
}

export const linkFormatValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const fileFormat = control.get('materialFormat')?.value;
  const materialLink = control.get('materialLink')?.value;

  if (!fileFormat || !materialLink) {
    return null;
  }

  const linkFormat = detectFormat(materialLink);
  if (linkFormat !== fileFormat) {
    return { formatMismatch: true };
  }

  return null;
};
