import { inject, Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { map, Observable, startWith } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MaterialsService {
  private translate = inject(TranslateService);

  public getMaterialType(materialLink: string): 'pdf' | 'video' | 'audio' | 'unknown' {
    const url = materialLink.toLowerCase();

    if (url.includes('youtube.com') || url.includes('vimeo.com')) {
      return 'video';
    } else if (url.endsWith('.pdf')) {
      return 'pdf';
    } else if (url.endsWith('.mp3') || url.endsWith('.wav')) {
      return 'audio';
    }
    return 'unknown';
  }

  translateDate(date: string | number | Date): Observable<string> {
    return this.translate.onLangChange.pipe(
      startWith({ lang: this.translate.currentLang } as LangChangeEvent),
      map((event: LangChangeEvent) => {
        const lang = event?.lang || this.translate.currentLang;
        return new Date(date).toLocaleDateString(lang, {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
      })
    );
  }
}
