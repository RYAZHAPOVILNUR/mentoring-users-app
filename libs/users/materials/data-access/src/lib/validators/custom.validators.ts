import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function checkingLinksForValidators(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value;

        if(!value){
            return null
        }

        const hasFormatMusic = value.endsWith('.mp3');
        const hasFormatPdf = value.endsWith('.pdf');
        const hasFormatMovie = value.startsWith('https://www.youtube.com/');

        const urlValid = hasFormatMusic || hasFormatPdf || hasFormatMovie;

        return !urlValid ? { urlValue: { value: value }} : null;
    }
}