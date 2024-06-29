import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { MaterialType } from "@users/users/materials/data-access";
import { getMaterialType } from "@users/users/materials/utils";

export const materialLinkValidator = (materialType: MaterialType): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    return getMaterialType(control.value) !== materialType
      ? { incorrectLink: 'Material link is incorrect' }
      : null
  }
};
