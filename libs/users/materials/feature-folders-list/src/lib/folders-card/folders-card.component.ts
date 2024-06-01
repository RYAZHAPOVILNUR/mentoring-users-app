import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '@users/materials-list';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {

}
