import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PDFProgressData, PdfViewerModule } from 'ng2-pdf-viewer';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { YoutubePlayerComponent } from '@youtube-player';

@Component({
  selector: 'lib-materials-content-view',
  imports: [CommonModule, CommonModule, PdfViewerModule, MatProgressBarModule, YoutubePlayerComponent],
  templateUrl: './materials-content-view.component.html',
  styleUrl: './materials-content-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentViewComponent {
  public readonly data: any = inject(MAT_DIALOG_DATA);
  materialLink = this.data.material.material_link;
  public loadedProgress = true;

  onProgress(progressData: PDFProgressData) {
    if (progressData.total === progressData.loaded) {
      this.loadedProgress = false;
    }
  }
  onAudioLoaded(): void {
    this.loadedProgress = false;
  }
  onVideoLoaded(isReady: boolean) {
    if (isReady == true) {
      this.loadedProgress = false;
    }
  }
  public getVideoId(): string {
    const youtubeRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/;
    const match = this.materialLink.match(youtubeRegex);
    return match ? match[1] : '';
  }
}
