import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-audio-player-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-player-dialog.component.html',
  styleUrls: ['./audio-player-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioPlayerDialogComponent {}
