import { AbstractControl } from '@angular/forms';

export function onlyNumbersValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const regex = /^[0-9]*$/;
  if (!control.value || regex.test(control.value)) {
    return null;
  } else {
    return { onlyNumbers: true };
  }
}
