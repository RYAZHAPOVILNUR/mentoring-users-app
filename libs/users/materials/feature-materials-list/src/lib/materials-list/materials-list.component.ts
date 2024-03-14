import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsCardComponent } from './../materials-card/materials-card.component';
import { FolderListVM } from '@users/materials/feature-folders-list';
import { IMaterial } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true })
  vmList!: FolderListVM;
  @Output() deleteMaterial = new EventEmitter();

  onDeleteMaterial(material: IMaterial) {
    this.deleteMaterial.emit(material);
  }
}
