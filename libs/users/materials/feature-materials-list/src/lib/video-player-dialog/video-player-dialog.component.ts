import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-video-player-dialog',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './video-player-dialog.component.html',
  styleUrls: ['./video-player-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerDialogComponent {
  public readonly data = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef);

  public videoLink: SafeResourceUrl = '';
  videoValidation = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    const id = this.data.match(this.videoValidation);
    const trustedUrl = `https://www.youtube.com/embed/`;
    this.videoLink = this.sanitizer.bypassSecurityTrustResourceUrl(`${trustedUrl}${id[1]}`);
  }

  onPlayrClose() {
    this.dialogRef.close();
  }
}
