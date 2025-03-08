import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListVM } from './materials-list-view-model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsDTO } from '../../../../../../core/data-access/src/lib/materials-dto.model';

@Component({
  selector: 'materials-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MaterialsCardComponent, MatButtonModule, MatIconModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true }) vmf!: MaterialsListVM;

  @Output() closeMaterials = new EventEmitter();
  @Output() deleteMaterial = new EventEmitter<MaterialsDTO>();


  onCloseMaterials() {
    this.closeMaterials.emit()
  }

  onDeleteMaterial(material: MaterialsDTO) {
    console.log(material)
    this.deleteMaterial.emit(material);
  }
}
