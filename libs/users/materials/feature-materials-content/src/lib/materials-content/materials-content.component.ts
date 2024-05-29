import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContentData } from 'libs/users/materials/data-access/src/lib/models/folders.interface';
import { YoutubeThumbnailPipe } from '../../../../../../core/utils/src/lib/youtube-thumbnail.pipe'; // Ensure the correct path

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, PdfViewerModule, YoutubeThumbnailPipe],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  public isVideoPlaying = false;
  public videoUrl: SafeResourceUrl | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ContentData, private sanitizer: DomSanitizer) {}

  playVideo(): void {
    const videoId = this.extractVideoId(this.data.content);
    if (videoId) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${videoId}?autoplay=1`
      );
      this.isVideoPlaying = true;
    }
  }

  private extractVideoId(url: string): string | null {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  }
}
