import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { materialsValidation } from '../../../../data-access/src/lib/+state/materials-validation';
import { IMaterial } from '../../../../data-access/src/lib/+state/models/material.model';


@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {

  @Input({ required: true })
  public material!: IMaterial;

  public readonly materialsValidation = materialsValidation;
}
