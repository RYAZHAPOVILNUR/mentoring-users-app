import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../../../feature-folders-list/src/lib/folders-card/folders-card.component';

@Component({
  selector: 'users-users-materials',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent],
  templateUrl: './users-materials.component.html',
  styleUrls: ['./users-materials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsComponent {}
