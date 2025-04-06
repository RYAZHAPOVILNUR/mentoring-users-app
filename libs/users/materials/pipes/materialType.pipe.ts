import { Pipe, PipeTransform } from '@angular/core';

export enum MaterialType {
  AUDIO = 'audiotrack',
  PDF = 'picture_as_pdf',
  VIDEO = 'ondemand_video',
  NoType = 'no_type',
}

@Pipe({ name: 'defineMaterialType', standalone: true })
export class DefineMaterialTypePipe implements PipeTransform {
  transform(value: string): MaterialType {
    const isAudio = value.endsWith('.mp3');
    if (isAudio) return MaterialType.AUDIO;

    const isPdf = value.endsWith('.pdf');
    if (isPdf) return MaterialType.PDF;

    const isVideo = value.includes('youtu');
    if (isVideo) return MaterialType.VIDEO;
    return MaterialType.NoType;
  }
}
