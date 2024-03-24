import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkValidation',
  standalone:true
})
export class LinkValidationPipe implements PipeTransform {
  transform(link: string, materialType: string): boolean {
    switch(materialType) {
      case 'Video':
        return /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/.test(link);
      case 'PDF':
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.pdf$/.test(link);
      case 'Podcast':
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.mp3$/.test(link);
      default:
        return true;
    }
  }
}
