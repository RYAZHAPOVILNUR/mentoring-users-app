import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'youTubeLinkImg',
  standalone: true,
})
export class YouTubeLinkImgPipe implements PipeTransform {
  transform(link: string): string {
    if(link.includes('.youtube.com/')){
      return 'http://img.youtube.com/vi/'+ link.split('=')[1].split('&')[0]+ '/maxresdefault.jpg'
    }
    else {
      return 'http://img.youtube.com/vi/'+ link.split('.be/')[1].split('?')[0]+ '/maxresdefault.jpg'
    }
  }
}

