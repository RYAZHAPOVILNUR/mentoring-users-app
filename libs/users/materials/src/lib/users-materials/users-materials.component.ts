import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateMaterialButtonComponent } from '@users/materials/create-material-button';

@Component({
  selector: 'users-users-materials',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, CreateMaterialButtonComponent],
  templateUrl: './users-materials.component.html',
  styleUrls: ['./users-materials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsComponent {}
