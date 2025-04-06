import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogRef } from '@angular/cdk/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'users-audio-player-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatCardModule,
  ],
  templateUrl: './audio-player-dialog.component.html',
  styleUrls: ['./audio-player-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioPlayerDialogComponent {
  public readonly data = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(DialogRef);

  @ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;

  isPlaying = signal(false);
  progress = signal(0);
  currentTime = signal(0);
  duration = signal(0);

  togglePlay() {
    const audio = this.audioRef.nativeElement;
    if (audio.paused) {
      audio.play();
      this.isPlaying.set(true);
    } else {
      audio.pause();
      this.isPlaying.set(false);
    }
  }

  stop() {
    const audio = this.audioRef.nativeElement;
    audio.pause();
    audio.currentTime = 0;
    this.isPlaying.set(false);
    this.progress.set(0);
    this.currentTime.set(0);
  }

  updateProgress() {
    const audio = this.audioRef.nativeElement;
    this.currentTime.set(audio.currentTime);
    this.progress.set((audio.currentTime / audio.duration) * 100);
  }

  updateMetadata() {
    this.duration.set(this.audioRef.nativeElement.duration);
  }

  seek(event: Event) {
    const audio = this.audioRef.nativeElement;
    const newTime = (event.target as HTMLInputElement).value;
    audio.currentTime = (Number(newTime) / 100) * audio.duration;
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  onPlayrClose() {
    this.dialogRef.close();
    this.stop();
  }
}
