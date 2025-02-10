import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '@feature-folders-list';

@Component({
  selector: 'users-users-materials',
  standalone: true,
  imports: [CommonModule, FoldersListComponent],
  templateUrl: './users-materials.component.html',
  styleUrls: ['./users-materials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsComponent {}
