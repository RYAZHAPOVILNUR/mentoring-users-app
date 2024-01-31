import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsEntity } from '../../data-access/src/lib/models/materials.entity';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { vmMaterials } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsCardComponent
  ],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
})
export class MaterialsListComponent {
  @Input({required: true}) vm!: vmMaterials;
  @Output() deleteMaterial = new EventEmitter<MaterialsEntity>();

  onDeleteMaterial(material: MaterialsEntity){
    this.deleteMaterial.emit(material);
  }
}