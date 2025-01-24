import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FoldersAddButtonComponent } from './materials/users-folders-add-button';


@Component({
  selector: 'users-users-materials',
  standalone: true,
  imports: [CommonModule],
  // imports: [CommonModule, FoldersAddButtonComponent],
  templateUrl: './users-materials.component.html',
  styleUrls: ['./users-materials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsComponent {}
