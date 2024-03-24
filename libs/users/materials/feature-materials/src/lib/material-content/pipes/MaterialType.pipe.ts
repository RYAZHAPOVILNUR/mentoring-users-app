import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'materialType',
  standalone:true
})
export class MaterialTypePipe implements PipeTransform {

  transform(link: string): string {
    const extension = link.split('.').pop();
  
    switch(extension) {
      case 'pdf':
        return 'pdf';
      case 'mp3':
        return 'audio';
      default:
        return 'video';
    }
  }

}
