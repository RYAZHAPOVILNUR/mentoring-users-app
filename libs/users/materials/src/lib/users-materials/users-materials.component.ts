import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FoldersAddButtonComponent } from 
// 'libs/users/materials/feature-folder-create/src/lib/folders-add-button/folders-add-button.component';
// import { FoldersListContainerComponent } from 
// 'libs/users/materials/feature-folder-list/src/lib/folders-list-container/folders-list-container.component';
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
