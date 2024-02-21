import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsAddBtnComponent } from '../../../feature-materials/src/lib/materials-add-btn/materials-add-btn.component';

@Component({
  selector: 'users-users-materials',
  standalone: true,
  imports: [CommonModule, MaterialsAddBtnComponent],
  templateUrl: './users-materials.component.html',
  styleUrls: ['./users-materials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsComponent {}
