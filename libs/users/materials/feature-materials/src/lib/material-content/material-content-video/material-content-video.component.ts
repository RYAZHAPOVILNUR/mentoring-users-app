import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-material-content-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './material-content-video.component.html',
  styleUrls: ['./material-content-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialContentVideoComponent {
  @Input({required:true}) 
  link!:string

  public getVideoId(): string | null {
    const youtubeRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/;
    const match = this.link.match(youtubeRegex);
    return match ? match[1] || match[2] : null;
  }

}
