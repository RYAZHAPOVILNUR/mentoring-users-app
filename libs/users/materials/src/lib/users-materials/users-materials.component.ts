import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFolderButtonComponent } from '@materials/feature-folders-create';

@Component({
  selector: 'users-users-materials',
  standalone: true,
  imports: [CommonModule, CreateFolderButtonComponent],
  templateUrl: './users-materials.component.html',
  styleUrls: ['./users-materials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsComponent {}
