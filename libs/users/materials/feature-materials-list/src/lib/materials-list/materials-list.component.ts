import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersCardComponent } from '@users/feature-folders-list';
import { MaterialsListVm } from './materials-list-vm';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { Material } from '../../../../data-access/src/lib/models/material.models';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MaterialsCardComponent, MatProgressBarModule, FoldersCardComponent, MatProgressSpinnerModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({required: true}) vm!: MaterialsListVm
  @Output() goBackEvent = new EventEmitter()
  @Output() openMaterialEvent = new EventEmitter()
  @Output() deleteMaterialEvent = new EventEmitter()


  goBackToFolders() {
    this.goBackEvent.emit()
  }

  openMaterial(material: Material) {
    this.openMaterialEvent.emit(material)
  }

  deleteMaterial(material: Material) {
    this.deleteMaterialEvent.emit(material)
  }
}
