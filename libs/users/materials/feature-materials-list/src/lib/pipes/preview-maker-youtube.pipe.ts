import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'transformYoutubeLink',
  standalone: true
})
export class TransformYoutubeLinkPipe implements PipeTransform { //  todo TransformYoutubeLinkPipe?
  private readonly sanitizer = inject(DomSanitizer);

  /**
   * @param {string} url - ссылка формата "https://www.youtube.com/watch?v=ID&DATA"
   *   где ID - обязательная часть ссылки, используемая для идентификации видеоролика
   *   где DATA - не обязательная часть ссылки, может отсутствовать
   *
   * @returns {SafeResourceUrl} - очищенная ссылка в формате "https://www.youtube.com/embed/ID".
   */
  transform(url: string): SafeResourceUrl | string {
    const youtubeLink = 'https://www.youtube.com';
    if (!url.includes(youtubeLink)) return '';

    const idRegex = /watch\?v=([^&]*)/;
    const idMatch = url.match(idRegex);
    if (!idMatch) return '';

    return this.sanitizer.bypassSecurityTrustResourceUrl(`${youtubeLink}/embed/${idMatch[1]}`);
  }
}


