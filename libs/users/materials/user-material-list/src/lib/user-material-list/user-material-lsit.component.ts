import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserMaterialCardComponent } from '../user-material-card/user-material-card.component';
import { MaterialListVM } from './material-list-view-model';
import { MaterialsVM } from '../user-material-card/materials.vm';

@Component({
  selector: 'materials-ui',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, UserMaterialCardComponent],
  templateUrl: './user-material-lsit.component.html',
  styleUrls: ['./user-material-lsit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMaterialListComponent {
  @Input({required: true})
  vm!: MaterialListVM;

  @Output() deleteMaterial = new EventEmitter();
  @Output() openMaterial = new EventEmitter();

  onDeleteMaterial(material: MaterialsVM) {
    this.deleteMaterial.emit(material)
  }

  onOpenMaterial(id: number) {
    this.openMaterial.emit(id)
  }
}
