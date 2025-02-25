import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FolderListContainerComponent} from '../../../feature-materials-list/src/lib/folder-list-container/folder-list-container.component'

@Component({
  selector: 'users-users-materials',
  standalone: true,
  imports: [CommonModule, FolderListContainerComponent],
  templateUrl: './users-materials.component.html',
  styleUrls: ['./users-materials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsComponent {}
