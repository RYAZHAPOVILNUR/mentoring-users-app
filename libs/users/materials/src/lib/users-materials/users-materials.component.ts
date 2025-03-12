import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '@users/feature-folders-list';
import { FoldersListContainerComponent } from "../../../feature-folders-list/src/lib/folders-list-container/folders-list-container.component";

@Component({
  selector: 'users-users-materials',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, FoldersListContainerComponent],
  templateUrl: './users-materials.component.html',
  styleUrls: ['./users-materials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsComponent {}
