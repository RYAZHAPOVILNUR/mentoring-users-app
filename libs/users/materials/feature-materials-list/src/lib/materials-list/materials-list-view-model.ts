import { DeepReadonly } from '@users/core/utils';
import { FolderDTO, MaterialDTO } from '@users/materials/data-access';
import { MaterialsErrors } from '@users/materials/data-access';
import { LoadingStatus } from '@users/core/data-access';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export type MaterialsListVM = DeepReadonly<{
  openedFolder: FolderDTO | null | undefined;
  materials: MaterialDTO[];
  status: LoadingStatus;
  errors: MaterialsErrors | null;
}>;

export enum MaterialType {
  PDF  = 'pdf',
  AUDIO = 'audio',
  VIDEO = 'video',
}

export const regexMaterials = {
  pdf: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.pdf$/,
  audio: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.mp3$/,
  video: /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/,
}

export function materialLinkValidator (data: MaterialType): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const trimmedValue = control.value?.trim().replace(/\s+/g, ' ');
    switch (data) {
      case MaterialType.PDF:
        if (regexMaterials.pdf.test(trimmedValue)) return null;
        break;
      case MaterialType.AUDIO:
        if (regexMaterials.audio.test(trimmedValue)) return null;
        break;
      case MaterialType.VIDEO:
        if (regexMaterials.video.test(trimmedValue)) return null;
        break;
    }
    return { error: 'Error'}
  };
}
