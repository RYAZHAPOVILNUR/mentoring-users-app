import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YouTubePlayer } from '@angular/youtube-player';


@Component({
  selector: 'lib-youtube-player',
  imports: [CommonModule, YouTubePlayer],
  templateUrl: './youtube-player.component.html',
  styleUrl: './youtube-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YoutubePlayerComponent {
  @Input({ required: true }) videoId: string = '';
  @Input() height: number = 390;
  @Input() width: number = 640;
  @Output() readyStateChange = new EventEmitter<boolean>();
  private player: any;
  isReady: boolean = false;

  ngOnInit() {
    // Async loading YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  onPlayerReady(event: any) {
    this.player = event.target;
    this.isReady = true;
    this.readyStateChange.emit(this.isReady); 
  }

  onPlayerStateChange(event: any) {
    console.log('Player state:', event.data);
  }

  constructor() {
    console.log(this.videoId)
  }
}
