import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderAddButtonComponent } from '../folder-add-button/folder-add-button.component';

@Component({
  selector: 'users-materials',
  standalone: true,
  imports: [CommonModule, CommonModule, FolderAddButtonComponent],
  templateUrl: './users-materials.component.html',
  styleUrls: ['./users-materials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsComponent {}
