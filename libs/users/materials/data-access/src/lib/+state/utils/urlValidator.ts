import { MaterialFileType } from "@users/core/data-access";
import { AbstractControl, ValidatorFn } from '@angular/forms';

export const YTRegExp = /http\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;

export function urlValidator(fileType: MaterialFileType): ValidatorFn {
    console.log(fileType);
    return (control: AbstractControl) => {
        const URL = control.value as string;

        const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        const YTpattern = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;

        const isValid = pattern.test(URL);

        if (isValid) {
            console.log(URL, fileType, URL.endsWith(fileType));
            if (URL.endsWith(fileType)) {
                return null; // Pdf and mp3 validation passed
            } else if (fileType === 'видео' && YTpattern.test(URL)) {
                return null; // YT validation passed
            }
            return { urlValidator: true }; // Validation fails
        } else {
            return { urlValidator: true }; // Validation fails
        }
    };
}