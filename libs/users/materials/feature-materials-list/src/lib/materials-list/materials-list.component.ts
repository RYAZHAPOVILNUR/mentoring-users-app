import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { TMaterialDTO } from '@users/materials/data-access';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TMaterialListVM } from './materials-list-view-model';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsCardComponent,
    MatProgressBarModule,
  ],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.css'],
})
export class MaterialsListComponent {
  @Output() deleteMaterial = new EventEmitter<TMaterialDTO>();
  @Output() openMaterial = new EventEmitter<TMaterialDTO>();
  @Input({ required: true })
  public vm!: TMaterialListVM;

  public onDeleteMaterial(material: TMaterialDTO): void {
    this.deleteMaterial.emit(material);
  }

  public onOpenMaterial(material: TMaterialDTO): void {
    this.openMaterial.emit(material);
  }
}
