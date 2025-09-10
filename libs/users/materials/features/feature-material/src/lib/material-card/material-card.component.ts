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

  @Output() viewMaterialClick = new EventEmitter<Material>();
  @Output() deleteMaterialClick = new EventEmitter<Material>();

  onViewButtonClick(material: Material) {
    this.viewMaterialClick.emit(material);
  }
  onDeleteButtonClick(material: Material) {
    this.deleteMaterialClick.emit(material);
  }
}
