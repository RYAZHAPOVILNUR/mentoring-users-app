import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsEntity } from '../../../../data-access/src/lib/models/materials.entity';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MaterialsListVM } from './materials-list-view-model';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MaterialsCardComponent, MatProgressBarModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true })
  vm!: MaterialsListVM;
  @Output()
  deleteMaterial = new EventEmitter();
  @Output()
  viewMaterial = new EventEmitter();

  public onDeleteMaterial(material: MaterialsEntity) {
    this.deleteMaterial.emit(material)
  }

  public onViewMaterial(material: MaterialsEntity) {
    this.viewMaterial.emit(material)
  }
}
