import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Material } from '@users/data-access-materials';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';

@Component({
  selector: 'users-materials-list',
  imports: [CommonModule, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrl: './materials-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input() materials!: Material[];
  @Output() deleteMaterial = new EventEmitter<Material>();
  @Output() viewMaterial = new EventEmitter<Material>();

  onDelete(material: Material) {
    this.deleteMaterial.emit(material);
  }

  openMaterial(material: Material) {
    this.viewMaterial.emit(material);
  }
}
