import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { limitSymbols } from 'libs/core/pipes/custom-pipes';
import { formatDate } from 'libs/core/utils/src/lib/date-utils';
import { materialsValidation } from 'libs/users/materials/data-access/src/lib/constants-enums/materials-validation';
import { MaterialsType } from "libs/users/settings/feature-change-theme/src/lib/style-manager/style-manager";

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule, limitSymbols],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input({ required: true })
  material!: MaterialsType;

  @Output() deleteMaterial = new EventEmitter();

  public readonly materialsValidation = materialsValidation;

  public formatDate(time: number): string {
      return formatDate(time); 
    }

  public OnDeleteMaterial(material: MaterialsType) {
    this.deleteMaterial.emit(material);
  }
}