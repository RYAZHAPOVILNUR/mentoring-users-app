import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomLinkValidator {
  static validate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value as string;
      const fileExtensionRegex = /\.(mp3|pdf)$/i;
      const youtubeUrlRegex =
        /^(https?:\/\/)?(www\.)?(youtube\.com\/(embed\/|v\/|watch\?v=)|youtu\.be\/)/i;

      if (fileExtensionRegex.test(value)) {
        return null;
      } else if (youtubeUrlRegex.test(value)) {
        return null;
      } else {
        return { customLinkValidation: true };
      }
    };
  }
}
