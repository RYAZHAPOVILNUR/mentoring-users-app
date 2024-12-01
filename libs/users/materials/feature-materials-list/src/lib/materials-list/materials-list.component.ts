import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDTO } from '@users/materials/data-access';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
})
export class MaterialsListComponent {
  @Input({ required: true }) materials!: MaterialDTO[];
  @Output() deleteMaterial = new EventEmitter();
  @Output() openMaterial = new EventEmitter();
  onDeleteMaterial(material: MaterialDTO) {
    this.deleteMaterial.emit(material);
  }
  onOpenMaterial(material: MaterialDTO) {
    this.openMaterial.emit(material);
  }
}
