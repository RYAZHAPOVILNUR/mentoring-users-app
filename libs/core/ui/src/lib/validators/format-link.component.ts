import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { isVideo, isAudio, isPdf } from "@users/core/utils";

export function linkValidator(format: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (typeof value !== "string") {
            return { invalidLink: true }
          }
        if (format === 'Видео') {
            if (isVideo(value)) {
              return null;
            }
          } else if (format === 'PDF') {
            if (isPdf(value)) {
              return null;
            }
          } else if (format === 'Подкаст') {
            if (isAudio(value)) {
              return null;
            }
          }
        return { invalidLink: true }; 
    };
  }