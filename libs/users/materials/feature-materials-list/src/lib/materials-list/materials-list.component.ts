import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsVM } from 'libs/users/materials/view-models/materials-vm';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { materialsListVM } from './materials-list-view-model';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatProgressBarModule, MaterialsCardComponent, AsyncPipe],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Output() backToFolder = new EventEmitter();
  @Output() deleteMaterial = new EventEmitter();
  @Output() openMaterial = new EventEmitter();

  @Input({ required: true })
  public vm!: materialsListVM;

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