import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { YoutubeEmbedLinkPipe } from '@users/pipes';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'materials-content',
  standalone: true,
  imports: [CommonModule, MatDialogModule, PdfViewerModule, MatIconModule, MatButtonModule, MatTooltipModule, YoutubeEmbedLinkPipe],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  public readonly sanitizer = inject(DomSanitizer)
  public readonly data = inject(MAT_DIALOG_DATA)
  public readonly title = this.data.material.title
  public readonly materialLink = this.data.material.material_link
  public readonly fileType = this.data.material.fileType

  getYoutubeEmbedLink(value: string) {
    const result = value.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w\-]{10,12})\b/)
    const videoID = result? result[1] : ''
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoID}`)
  }
}

