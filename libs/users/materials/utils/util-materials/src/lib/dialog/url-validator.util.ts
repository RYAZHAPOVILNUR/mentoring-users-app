import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { MaterialType } from '@users/ui-materials';

function getYoutubeUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    try {
      const url = new URL(control.value);
      const isYouTube = url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be');

      return isYouTube ? null : { notYouTubeUrl: true };
    } catch {
      return { invalidUrl: true };
    }
  };
}

function getAudioValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim();
    if (!value) return null;

    try {
      const url = new URL(control.value);
      const path = url.pathname.toLowerCase();
      const audioExtensions = ['.mp3', '.wav', '.flac', '.ogg'];
      const isAudio = audioExtensions.some((ext) => path.endsWith(ext));
      return isAudio ? null : { notAudioUrl: true };
    } catch {
      return { invalidUrl: true };
    }
  };
}

function getPdfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim();
    if (!value) return null;

    try {
      const url = new URL(control.value);
      const isPdf = url.pathname.toLowerCase().endsWith('.pdf');

      return isPdf ? null : { notPdfUrl: true };
    } catch {
      return { invalidUrl: true };
    }
  };
}

export function getLinkValidators(type: MaterialType): ValidatorFn {
  const URL_PATTERN = /^https?:\/\/[^\s$.?#].[^\s]*$/;

  switch (type) {
    case MaterialType.VIDEO:
      return getYoutubeUrlValidator();
    case MaterialType.AUDIO:
      return getAudioValidator();
    case MaterialType.PDF:
      return getPdfValidator();
    default:
      return Validators.pattern(URL_PATTERN);
  }
}
