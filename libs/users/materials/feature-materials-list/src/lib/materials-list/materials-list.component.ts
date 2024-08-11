import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListVM } from './materials-list-view-model';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MaterialsAddButtonComponent } from '@users/materials/feature-materials-create';
import { Material } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MaterialsCardComponent, MaterialsAddButtonComponent, MatProgressBarModule, MatIconModule, MatButtonModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({required: true})
  vm!: MaterialsListVM

  @Input({ required: true })
  folderTitle!: string;

  @Output() back = new EventEmitter();
  @Output() openMaterialDialog = new EventEmitter();
  @Output() deleteMaterial = new EventEmitter();

  public onBackBtn() {
    this.back.emit()
  }

  public onOpenMaterialDialog(material: Material) {
    this.openMaterialDialog.emit(material)
  }

  public onDeleteMaterial(event: Event) {
    this.deleteMaterial.emit(event)
  }
}
