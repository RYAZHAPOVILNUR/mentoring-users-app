import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-material-content-audio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './material-content-audio.component.html',
  styleUrls: ['./material-content-audio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialContentAudioComponent {
  @Input({required:true}) 
  link!:string

}
