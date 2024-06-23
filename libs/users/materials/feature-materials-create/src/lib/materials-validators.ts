import { AbstractControl, ValidatorFn } from '@angular/forms';
import { MaterialType, regex } from '@users/materials/data-access';

export class MaterialsValidators {
  // Expose validator as public static function
  // function that receives an argument from the user and
  // creates a validator function
  static ofType(type: string): ValidatorFn {
    // returns a function which takes an Anstract control as an input
    return (control: AbstractControl): { [key: string]: any } | null => {
      console.log({ type }, { control });
      if (control.value) {
        switch (type) {
          case MaterialType.Audio:
            if (!regex.audio.test(control.value)) {
              return {
                invalidUrl: MaterialType.Audio,
              };
            }
            break;
          case MaterialType.Video:
            if (!regex.video.test(control.value)) {
              return {
                invalidUrl: MaterialType.Video,
              };
            }
            break;
          case MaterialType.Pdf:
            if (!regex.pdf.test(control.value)) {
              return {
                invalidUrl: MaterialType.Pdf,
              };
            }
            break;
        }
      }
      // Validation passed; To signal this we need to return null
      return null;
    };
  }
}
