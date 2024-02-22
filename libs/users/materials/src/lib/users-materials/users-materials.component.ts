import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialFolderAddBtnComponent } from '../../../feature-materials-folder/src/lib/material-folder-add-btn/material-folder-add-btn.component';

@Component({
  selector: 'users-users-materials',
  standalone: true,
  imports: [CommonModule, MaterialFolderAddBtnComponent],
  templateUrl: './users-materials.component.html',
  styleUrls: ['./users-materials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsComponent {}
