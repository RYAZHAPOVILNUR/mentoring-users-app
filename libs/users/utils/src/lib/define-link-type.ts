import { MaterialFileType, regexFileType } from '@users/utils';

export function defineLinkType(url: string) {
  switch (true) {
    case regexFileType.video.test(url):
      return MaterialFileType.Video;
    case regexFileType.audio.test(url):
      return MaterialFileType.Audio;
    case regexFileType.pdf.test(url):
      return MaterialFileType.Pdf;
    default:
      return undefined;
  }
}
