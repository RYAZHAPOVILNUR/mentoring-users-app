import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Material } from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'users-materials-list-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule],
  templateUrl: './materials-list-card.component.html',
  styleUrls: ['./materials-list-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListCardComponent {
  @Input({required: true})
  material!: Material;
}
