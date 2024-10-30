import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsVM } from '@users/materials';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, PdfViewerModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsContentComponent implements OnInit, OnChanges{
  @Input({ required: true }) material!: MaterialsVM;
  private sanitizer = inject(DomSanitizer);
  public data: { type: string, url: string} = inject(MAT_DIALOG_DATA)
  public cdr = inject(ChangeDetectorRef)

  get sanitizedUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.getEmbeddedUrl(this.data.url));
  }

  ngOnChanges() {
    console.log('Data changed in MaterialsContentComponent:', this.data);
  }

  ngOnInit() {
    console.log('Data received in MaterialsContentComponent:', this.data);
    console.log('Current file type:', this.data.type);
    console.log('Sanitized URL:', this.sanitizedUrl);
    this.cdr.detectChanges();

    const supportedTypes = ['video', 'pdf', 'podcast'];
    if (!supportedTypes.includes(this.data.type)) {
      console.warn('Unsupported type:', this.data.type); // Логирование неподдерживаемого типа
    }
  }

  private getEmbeddedUrl(url: string): string {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtube.com/playlist?list=')) {
      // Если это плейлист, вы можете решить, как обрабатывать это
      return ''; // Или добавить логику для встраивания плейлистов
    }
    return url; // Возвращаем оригинальную ссылку, если это не видео YouTube
  }

}
export const LinkRegEx = {
  VIDEO_REGEX: /(youtube\.com\/watch\?v=|youtu\.be\/)([0-9A-Za-z_-]{10}[048AEIMQUYcgkosw])/,
  PDF_REGEX: /^http(s?):\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?(.pdf)$/,
  MP3_REGEX: /^(https?|ftp|file):\/\/(www.)?(.*?)\.(mp3)$/
};


export function materialUrlValidator(fileType: 'video' | 'pdf' | 'mp3'): ValidatorFn {
  return (control: AbstractControl) => {
    const url = control.value as string;

    if (url) {
      switch (fileType) {
        case 'video':
          return LinkRegEx.VIDEO_REGEX.test(url) ? null : { wrongURL: true };
        case 'pdf':
          return LinkRegEx.PDF_REGEX.test(url) ? null : { wrongURL: true };
        case 'mp3':
          return LinkRegEx.MP3_REGEX.test(url) ? null : { wrongURL: true };
        default:
          return { wrongURL: true };
      }
    }

    return { required: true };
  };
};

