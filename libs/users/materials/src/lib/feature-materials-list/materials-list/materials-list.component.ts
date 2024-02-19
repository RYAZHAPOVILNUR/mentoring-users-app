import { Component, inject, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { typeMaterial } from '../../../../data-access/src/lib/folders-materials-types/folders-materials-types';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'materials-list',
  standalone: true,
  templateUrl: './materials-list.component.html',
  imports: [
    CommonModule,
    MatListModule,
    MaterialsCardComponent,
    MatProgressBarModule,
  ],
})
export class MaterialsListComponent {
  @Input({ required: true })
  materialsList!: typeMaterial[] | null;

  @Input({ required: true })
  loading!: boolean | null;

  @Output() selectMaterial = new EventEmitter();
  @Output() deleteMaterial = new EventEmitter();

  onSelectMaterial(id: number) {
    this.selectMaterial.emit(id);
  }

  onDeleteMaterial(id: number) {
    this.deleteMaterial.emit(id);
  }
}
