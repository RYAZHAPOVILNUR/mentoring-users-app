import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Signal,
  ViewChild,
  ViewEncapsulation,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'users-video-player-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player-dialog.component.html',
  styleUrls: ['./video-player-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerDialogComponent {
  public readonly data = inject(MAT_DIALOG_DATA);
  public videoLink: SafeResourceUrl = '';

  videoValidation = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    const id = this.data.match(this.videoValidation);
    const trustedUrl = `https://www.youtube.com/embed/`;
    this.videoLink = this.sanitizer.bypassSecurityTrustResourceUrl(`${trustedUrl}${id[1]}`);
    console.log('V:', this.videoLink);
  }
}
