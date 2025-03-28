import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-video-player-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player-dialog.component.html',
  styleUrls: ['./video-player-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerDialogComponent {}
