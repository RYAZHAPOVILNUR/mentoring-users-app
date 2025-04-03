import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-video-player-dialog',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './video-player-dialog.component.html',
  styleUrls: ['./video-player-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerDialogComponent {
  public readonly data = inject(MAT_DIALOG_DATA);

  public videoLink: SafeResourceUrl = '';
  videoValidation = /(youtu\.be\/|[?&]v=|\/embed\/)([a-zA-Z0-9_-]{11})/;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    const id = this.data.match(this.videoValidation);
    if (id && id[2]) {
      const trustedUrl = `https://www.youtube.com/embed/`;
      this.videoLink = this.sanitizer.bypassSecurityTrustResourceUrl(`${trustedUrl}${id[2]}`);
    } else {
      console.error('Invalid YouTube link:', this.data);
    }
  }
}
