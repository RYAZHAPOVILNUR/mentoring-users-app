import { MaterialFileType } from "@users/core/data-access";
import { AbstractControl, ValidatorFn } from '@angular/forms';

export const LinkRegEx = {
    VIDEO_REGEX: /(youtube\.com\/watch\?v=|youtu\.be\/)([0-9A-Za-z_-]{10}[048AEIMQUYcgkosw])/,
    PDF_REGEX: /^http(s?):\/\/(www.)?(.*?)\.(pdf)$/,
    MP3_REGEX: /^http(s?):\/\/(www.)?(.*?)\.(mp3)$/
};

export function getMaterialType(url: string) {
    if (LinkRegEx.VIDEO_REGEX.test(url)) {
        return MaterialFileType.video;
    }

    if (LinkRegEx.PDF_REGEX.test(url)) {
        return MaterialFileType.pdf;
    }

    if (LinkRegEx.MP3_REGEX.test(url)) {
        return MaterialFileType.podcast;
    }

    return '';
}

export function urlValidator(fileType: MaterialFileType): ValidatorFn {
    return (control: AbstractControl<string | null>) => {
        const URL = control.value;

        if (URL) {
            switch (fileType) {
                case 'видео':
                    return LinkRegEx.VIDEO_REGEX.test(URL) ? null : { wrongURL: true };

                case 'pdf':
                    return LinkRegEx.PDF_REGEX.test(URL) ? null : { wrongURL: true };

                case 'mp3':
                    return LinkRegEx.MP3_REGEX.test(URL) ? null : { wrongURL: true };

                default:
                    return null;
            }
        }

        return null;
    };
};