import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsEntity } from '@users/users/materials/data-access';

@Component({
  selector: 'users-podcast-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './podcast-content.component.html',
  styleUrls: ['./podcast-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastContentComponent {
  @Input({required: true})
  material!: MaterialsEntity
}
