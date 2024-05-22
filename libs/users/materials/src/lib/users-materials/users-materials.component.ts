import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListContainerComponent } from '@users/feature-folders-list';

@Component({
  selector: 'users-users-materials',
  standalone: true,
  imports: [CommonModule, FoldersListContainerComponent],
  templateUrl: './users-materials.component.html',
  styleUrls: ['./users-materials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsComponent { }
