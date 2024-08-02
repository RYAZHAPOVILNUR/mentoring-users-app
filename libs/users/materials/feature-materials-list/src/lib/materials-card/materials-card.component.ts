import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MaterialType, regexMaterials } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  public readonly regexMaterials = regexMaterials;
  @Input({ required: true }) material!: MaterialType;
  @Output() deleteMaterial = new EventEmitter();

  public onDeleteMaterial(material: MaterialType): void {
    this.deleteMaterial.emit(material);
  }
}
