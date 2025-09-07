import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Material } from '@users/data-access-material';
@Component({
  selector: 'users-material-card',
  imports: [CommonModule, CommonModule, DatePipe, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './material-card.component.html',
  styleUrl: './material-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialCardComponent {
  @Input({ required: true }) material!: Material;

  public isHovered = false;

  @Output() viewMaterialClicked = new EventEmitter<Material>();
  @Output() materialDeleteClicked = new EventEmitter<Material>();

  viewClicked(material: Material) {
    this.viewMaterialClicked.emit(material);
  }
  deleteClicked(material: Material) {
    this.materialDeleteClicked.emit(material);
  }
}
