import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersAddButtonComponent } from '@users/feature-folder-create';
import { FoldersListContainerComponent } from '@users/feature-folder-list';

@Component({
  selector: 'users-users-materials',
  standalone: true,
  imports: [
    CommonModule, 
    FoldersAddButtonComponent,
    FoldersListContainerComponent
  ],
  templateUrl: './users-materials.component.html',
  styleUrls: ['./users-materials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsComponent {}
