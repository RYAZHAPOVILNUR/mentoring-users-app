import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MaterialsListVM } from './materials-list-view-model';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MaterialsListComponent {
  @Input({ required: true }) vm!: MaterialsListVM;
  @Output() deleteMaterial = new EventEmitter();

  onDeleteMaterial(materialId: number) {
    this.deleteMaterial.emit(materialId);
  }
}