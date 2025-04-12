import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    PdfViewerModule,
    MatIconModule,
  ],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  readonly dialogRef = inject(MatDialogRef<MaterialsContentComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  private readonly sanitizer = inject(DomSanitizer);

  getFileType(link: string | undefined): 'video' | 'audio' | 'pdf' | 'youtube' | 'unknown' {
    if (!link) return 'unknown';

    if (link.includes('youtube.com') || link.includes('youtu.be')) {
      return 'youtube';
    }

    const extension = link.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'mp4':
      case 'webm':
      case 'ogg':
        return 'video';
      case 'mp3':
      case 'wav':
      case 'm4a':
        return 'audio';
      case 'pdf':
        return 'pdf';
      default:
        return 'unknown';
    }
  }

  getYouTubeEmbedUrl(link: string | undefined): SafeResourceUrl | null {
    if (!link) return null;

    let videoId: string | null = null;
    if (link.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(link.split('?')[1]);
      videoId = urlParams.get('v');
    } else if (link.includes('youtu.be/')) {
      videoId = link.split('youtu.be/')[1].split(/[\/?]/)[0];
    }
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }
    return null;
  }
}