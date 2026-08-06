import { Pipe, PipeTransform } from '@angular/core';

import { Material } from '@users/ui-materials';

@Pipe({
  name: 'materialIcon',
})
export class MaterialIconPipe implements PipeTransform {
  transform(link: Material['material_link']) {

    const linkType = link 
      ? new URL(link).pathname.split('.').pop()?.toLowerCase() || '' 
      : '';

    switch (linkType) {
      case 'mp3':
      case 'wav':
      case 'flac':
      case 'ogg':
        return 'music_note';
      case 'pdf':
        return 'description';
      default:
        return 'live_tv';
    }
  }
}
