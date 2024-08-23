import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { materialsListVM } from './materials-list-view-model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MaterialsVM } from 'libs/users/materials/view-models/materials-vm';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatProgressBarModule, MaterialsCardComponent, AsyncPipe],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true })
  vm!: materialsListVM;

  @Output() backToFolder = new EventEmitter();
  @Output() deleteMaterial = new EventEmitter();
  @Output() openMaterial = new EventEmitter();

  public onBackToFolders(): void {
    this.backToFolder.emit();
  }

  public onDeleteMaterial(material: MaterialsVM) {
    this.deleteMaterial.emit(material);
  }

  public onOpenMaterial(material: MaterialsVM) {
    this.openMaterial.emit(material);
  }
}
