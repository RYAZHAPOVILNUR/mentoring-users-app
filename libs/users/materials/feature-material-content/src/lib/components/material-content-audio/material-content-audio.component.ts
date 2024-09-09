import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'users-material-content-audio',
  templateUrl: './material-content-audio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialContentAudioComponent {
  @Input() public audioSrc: string = '';
}
