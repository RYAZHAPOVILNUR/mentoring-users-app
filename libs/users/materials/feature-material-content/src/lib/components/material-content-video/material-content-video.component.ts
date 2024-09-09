import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { VideoSrcSanitizePipe } from '../../pipes/video-src-sanitize.pipe';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'users-material-content-video',
  templateUrl: './material-content-video.component.html',
  styleUrls: ['./material-content-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, VideoSrcSanitizePipe, TranslateModule],
})
export class MaterialContentVideoComponent {
  @Input() public videoSrc: string = '';
}
