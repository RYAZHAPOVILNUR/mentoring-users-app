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
  @Output() materialDeleteClicked = new EventEmitter<Material>();
  @Output() viewMaterialClicked = new EventEmitter<Material>();

  viewClicked(material: Material) {
    this.viewMaterialClicked.emit(material);
  }

  deleteClicked(material: Material) {
    this.materialDeleteClicked.emit(material);
  }
}
