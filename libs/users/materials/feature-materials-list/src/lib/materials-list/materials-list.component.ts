import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListVM } from './materials-list-view-model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MaterialsListCardComponent } from '../materials-list-card/materials-list-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Material } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MaterialsListCardComponent, MatProgressBarModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({required: true})
  vm!: MaterialsListVM;

  @Output() back = new EventEmitter();
  @Output() deleteMaterial = new EventEmitter();
  @Output() openMaterialDialog = new EventEmitter();

  public onBackBtn() {
    this.back.emit()
  }

  public onDeleteMaterial(event: Event) {
    this.deleteMaterial.emit(event)
  }

  public onOpenMaterialDialog(material: Material) {
    this.openMaterialDialog.emit(material)
  }
}
