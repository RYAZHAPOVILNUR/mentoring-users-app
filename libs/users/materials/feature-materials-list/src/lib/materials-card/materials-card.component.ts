import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { limitSymbols } from 'libs/core/pipes/custom-pipes';
import { MaterialsType } from 'libs/users/materials/data-access/src/lib/models/materials.type';
import { regexMaterials } from 'libs/users/materials/data-access/src/lib/constant-enums/materials-regex';

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

  public readonly regexMaterials = regexMaterials;

  public formatDate(time: number): string {
    const date = new Date(time);
    return `${date.getDate()} 
    ${date.toLocaleString('default', { month: 'short' }).slice(0, -1)} 
    ${date.getFullYear()}`;
  }

  public OnDeleteMaterial(material: MaterialsType) {
    this.deleteMaterial.emit(material);
  }
}
