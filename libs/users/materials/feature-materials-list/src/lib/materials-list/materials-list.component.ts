import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsListVM, MaterialsVM } from '@users/materials/data-access';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';

@Component({
  selector: 'users-materials-list-ui',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true })
  vm!: MaterialsListVM;

  @Output() deleteMaterial = new EventEmitter();

  onDeleteMaterial(material: MaterialsVM) {
    this.deleteMaterial.emit(material);
  }
}
