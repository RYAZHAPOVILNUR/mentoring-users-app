import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ContentData } from 'libs/users/materials/data-access/src/lib/models/folders.interface';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, PdfViewerModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ContentData) {}

  getYoutubeThumbnail(url: string): string {
    const videoId = this.extractVideoId(url);
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  }

  private extractVideoId(url: string): string | null {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  }
}
