import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IMaterial } from '../../../../data-access/src/lib/models/material.model';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input({ required: true }) material!: IMaterial;
}
