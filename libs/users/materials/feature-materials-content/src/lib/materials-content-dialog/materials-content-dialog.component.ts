import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UrlCheckerService } from '@users/core/http';
import { filter, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface IMaterialData {
  materialLink: string;
  title: string;
}

enum MaterialType {
  PDF = 'pdf',
  VIDEO = 'video',
  AUDIO = 'audio',
  UKNOWN = 'uknown',
}

const REGEX_FORMATS: Record<Exclude<MaterialType, MaterialType.VIDEO>, RegExp | null> = {
  [MaterialType.PDF]: /^https:\/\/.*\.pdf$/,
  [MaterialType.AUDIO]: /^https:\/\/.*\.mp3$/,
  [MaterialType.UKNOWN]: null,
};

type TYouTubeRegexType = 'SHARE' | 'WATCH' | 'EMBED';

const REGEX_YOUTUBE: Record<TYouTubeRegexType, RegExp> = {
  SHARE: /^https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/,
  WATCH: /^https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
  EMBED: /^https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
};

@Component({
  selector: 'materials-materials-content-dialog',
  standalone: true,
  imports: [CommonModule, NgIf, MatFormFieldModule, MatButtonModule, MatDialogModule, MatIconModule, PdfViewerModule],
  templateUrl: './materials-content-dialog.component.html',
  styleUrls: ['./materials-content-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentDialogComponent {
  private readonly dialogRef: MatDialogRef<MaterialsContentDialogComponent> = inject(
    MatDialogRef<MaterialsContentDialogComponent>
  );
  private readonly domSanitizer = inject(DomSanitizer);
  public readonly data: IMaterialData = inject(MAT_DIALOG_DATA);
  private readonly urlChecker = inject(UrlCheckerService);
  private readonly destroyRef = inject(DestroyRef);
  public errorMessage: string | null = null;
  protected readonly MaterialType = MaterialType;

  public get fileType(): MaterialType {
    const { materialLink } = this.data;
    if (materialLink.endsWith('.pdf')) return MaterialType.PDF;
    if (materialLink.endsWith('.mp3')) return MaterialType.AUDIO;
    if (materialLink.includes('youtube.com')) return MaterialType.VIDEO;
    return MaterialType.UKNOWN;
  }

  public get secureUrl(): SafeResourceUrl {
    const { materialLink } = this.data;

    if (this.fileType === MaterialType.VIDEO) {
      const videoId = this.extractVideoId(materialLink);
      if (videoId) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
      }
    }

    try {
      return this.sanitizerUrl(this.data.materialLink, this.fileType);
    } catch (error: any) {
      this.errorMessage = error.message;
      return '';
    }
  }

  private extractVideoId(url: string): string | null {
    let videoId = null;

    const shareMatch = url.match(REGEX_YOUTUBE.SHARE);
    if (shareMatch) {
      videoId = shareMatch[1];
    } else {
      const watchMatch = url.match(REGEX_YOUTUBE.WATCH);
      if (watchMatch) {
        videoId = watchMatch[1];
      } else {
        const embedMatch = url.match(REGEX_YOUTUBE.EMBED);
        if (embedMatch) {
          videoId = embedMatch[1];
        }
      }
    }
    return videoId;
  }

  private sanitizerUrl(url: string, type: MaterialType): SafeResourceUrl {
    const regExp = type !== MaterialType.VIDEO ? REGEX_FORMATS[type] : null;
    if (regExp && regExp.test(url)) {
      // здесь я уберу потом, пока недоделано
      // this.urlChecker
      //   .checkUrlExists(url)
      //   .pipe(
      //     // filter((result: boolean) => !result),
      //     tap((result: any) => {
      //       console.log(result);
      //       throw new Error(`Файл по указанной ссылке: ${url} - НЕ существует, укажите другой url`);
      //     }),
      //     takeUntilDestroyed(this.destroyRef)
      //   )
      //   .subscribe();
      if (type === MaterialType.PDF) {
        return url;
      } else return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }
    throw new Error(`Некорректная ссылка для типа материала: ${type}. Полученная ссылка: ${url}`);
  }
}
