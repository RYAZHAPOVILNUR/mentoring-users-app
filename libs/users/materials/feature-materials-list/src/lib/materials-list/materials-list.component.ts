import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListVM } from './materials-list-view-model';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsVM } from '../../../../materials-vm';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'materials-list',
  standalone: true,
  imports: [CommonModule, MaterialsCardComponent, MatProgressBarModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true })
  public vm!: MaterialsListVM;

  @Output() deleteMaterial = new EventEmitter();
  @Output() editMaterial = new EventEmitter();
  @Output() openMaterial = new EventEmitter();

  public onDeleteMaterial(dataForDeleteMaterial: { materialId: number; materialTitle: string }) {
    this.deleteMaterial.emit(dataForDeleteMaterial);
  }

  public onEditMaterial(material: MaterialsVM) {
    this.editMaterial.emit(material);
  }

  public onOpenMaterial(material: MaterialsVM) {
    this.openMaterial.emit(material);
  }
}
