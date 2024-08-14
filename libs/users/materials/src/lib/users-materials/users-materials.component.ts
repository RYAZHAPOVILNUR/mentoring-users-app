import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateMaterialsButtonComponent } from '@users/materials/feature-materials-create';

@Component({
  selector: 'users-users-materials',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, CreateMaterialsButtonComponent],
  templateUrl: './users-materials.component.html',
  styleUrls: ['./users-materials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsComponent {}
