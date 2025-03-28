import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { formatDate } from '@users/core/utils';
import { TMaterial } from '@users/materials/data-access';
import { materialsValidation } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input({ required: true })
  public material!: TMaterial;
  @Output() deleteMaterial = new EventEmitter();

  public readonly materialsValidation = materialsValidation;

  public formatDate(time: string) {
    return formatDate(time);
  }

  public onDeleteMaterial(material: TMaterial) {
    this.deleteMaterial.emit(material);
  }
}
