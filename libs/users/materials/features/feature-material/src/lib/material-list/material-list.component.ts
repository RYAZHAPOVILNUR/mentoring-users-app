import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Material } from '@users/data-access-material';

import { MaterialCardComponent } from '../material-card/material-card.component';

@Component({
  selector: 'users-material-list',
  imports: [CommonModule, MaterialCardComponent],
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialListComponent {
  @Input({ required: true }) materials!: Material[];
  @Output() viewMaterialClick = new EventEmitter<Material>();
  @Output() deleteMaterialClick = new EventEmitter<Material>();

  onViewButtonClick(material: Material) {
    this.viewMaterialClick.emit(material);
  }

  onDeleteButtonClick(material: Material) {
    this.deleteMaterialClick.emit(material);
  }
}
