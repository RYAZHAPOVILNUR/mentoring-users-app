import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { DeleteMaterialData, MaterialVM, ViewMaterialData } from '@users/data-access-material';

import { MaterialCardComponent } from '../material-card/material-card.component';

@Component({
  selector: 'users-material-list',
  imports: [CommonModule, MaterialCardComponent],
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialListComponent {
  @Input({ required: true }) materials!: MaterialVM[];
  @Output() viewMaterialClick = new EventEmitter<ViewMaterialData>();
  @Output() deleteMaterialClick = new EventEmitter<DeleteMaterialData>();

  onViewButtonClick(material: ViewMaterialData) {
    this.viewMaterialClick.emit(material);
  }

  onDeleteButtonClick(material: DeleteMaterialData) {
    this.deleteMaterialClick.emit(material);
  }
}
