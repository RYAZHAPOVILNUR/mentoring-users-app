import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DeleteMaterialData, MaterialVM, ViewMaterialData } from '@users/data-access-material';
@Component({
  selector: 'users-material-card',
  imports: [CommonModule, CommonModule, DatePipe, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './material-card.component.html',
  styleUrl: './material-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialCardComponent {
  @Input({ required: true }) material!: MaterialVM;

  public isHovered = false;

  @Output() viewMaterialClick = new EventEmitter<ViewMaterialData>();
  @Output() deleteMaterialClick = new EventEmitter<DeleteMaterialData>();

  onViewButtonClick(material: ViewMaterialData) {
    this.viewMaterialClick.emit(material);
  }
  onDeleteButtonClick(material: DeleteMaterialData) {
    this.deleteMaterialClick.emit(material);
  }
}
