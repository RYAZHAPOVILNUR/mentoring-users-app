import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMaterialsButtonComponent } from '@users/materials/feature-materials-create';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, CreateMaterialsButtonComponent],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {}
