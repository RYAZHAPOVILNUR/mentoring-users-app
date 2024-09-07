import { Injectable } from '@angular/core';
import { MaterialType } from '../enums/material-type.enum';

@Injectable()
export class MaterialValidationService {
  private readonly youtubeRegex =
    /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
  private readonly audioRegex = /\.(mp3|wav|aac|ogg)$/i;
  private readonly pdfRegex = /\.pdf$/i;

  private readonly linkValidators: Record<MaterialType, RegExp> = {
    [MaterialType.Video]: this.youtubeRegex,
    [MaterialType.Podcast]: this.audioRegex,
    [MaterialType.Pdf]: this.pdfRegex,
  };

  public getMaterialTypeByLink(link: string) {
    if (this.youtubeRegex.test(link)) {
      return MaterialType.Video;
    } else if (this.audioRegex.test(link)) {
      return MaterialType.Podcast;
    } else if (this.pdfRegex.test(link)) {
      return MaterialType.Pdf;
    }

    return MaterialType.Video;
  }

  public getRegExpByType(type: MaterialType): RegExp {
    return this.linkValidators[type];
  }
}
