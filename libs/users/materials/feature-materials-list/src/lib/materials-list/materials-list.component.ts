import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsListVM } from './materials-list-view-model';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { TMaterial } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatIconModule, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Output() backToFolders = new EventEmitter();
  @Output() deleteMaterial = new EventEmitter();
  @Output() openMaterial = new EventEmitter();

  @Input({ required: true })
  public vm!: MaterialsListVM;

  public onBackToFolders(): void {
    this.backToFolders.emit();
  }

  public onDeleteMaterial(material: TMaterial) {
    this.deleteMaterial.emit(material);
  }

  public onOpenMaterial(material: TMaterial) {
    this.openMaterial.emit(material);
  }
}
