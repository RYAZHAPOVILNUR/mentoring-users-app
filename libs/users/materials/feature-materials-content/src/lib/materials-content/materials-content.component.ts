import { ChangeDetectionStrategy, Component, Inject, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MaterialsContentService } from './materials-content.service';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, MatDialogModule, PdfViewerModule, MatCardModule, MatIconModule, MatButtonModule, YouTubePlayerModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsContentComponent {
  apiLoaded = inject(MaterialsContentService ).apiLoaded
  constructor(@Inject(MAT_DIALOG_DATA) public data: {materialLink: string,
  materialTitle: string}) {
  }

  extractVideoId(url: string): string {
    let videoId = '';
    const match = url.match(/^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/);
    if (match) {
      videoId = match[1];
    }
    return videoId;
  }
}
