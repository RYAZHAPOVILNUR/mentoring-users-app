import { MaterialFileType } from "@users/core/data-access";
import { AbstractControl, ValidatorFn } from '@angular/forms';

export const LinkRegEx = {
    VIDEO_REGEX: /(youtube\.com\/watch\?v=|youtu\.be\/)([0-9A-Za-z_-]{10}[048AEIMQUYcgkosw])/,
    PDF_REGEX: /^http(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?(.pdf)$/,
    MP3_REGEX: /^(https?|ftp|file):\/\/(www.)?(.*?)\.(mp3)$/
};

export function urlValidator(fileType: MaterialFileType): ValidatorFn {
    return (control: AbstractControl) => {
        const URL = control.value as string;

        if (URL) {
            if (fileType === 'видео') {
                return LinkRegEx.VIDEO_REGEX.test(URL) ? null : { wrongURL: true };
            }
            if (fileType === 'pdf') {
                return LinkRegEx.PDF_REGEX.test(URL) ? null : { wrongURL: true };
            }
            if (fileType === 'mp3') {
                return LinkRegEx.MP3_REGEX.test(URL) ? null : { wrongURL: true };
            }
        }

        return { required: true };
    };
};