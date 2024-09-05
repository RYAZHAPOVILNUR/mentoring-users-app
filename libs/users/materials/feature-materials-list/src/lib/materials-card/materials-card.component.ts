import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsVM } from '../..';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MaterialsCardComponent {
  @Input({ required: true }) material!: MaterialsVM;

  getFileType = (url: string) => {
    if (url.endsWith('pdf')) {
      return 'picture_as_pdf';
    } else if (url.endsWith('mp3')) {
      return 'queue_music';
    } else if (url.includes('youtube.com')) {
      return 'movie';
    }
    return 'question_mark';
  };
}
