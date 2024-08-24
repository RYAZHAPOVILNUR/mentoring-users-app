import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FoldersVM } from 'libs/users/materials/folders-vm';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({ required: true })
  folder!: FoldersVM
}
