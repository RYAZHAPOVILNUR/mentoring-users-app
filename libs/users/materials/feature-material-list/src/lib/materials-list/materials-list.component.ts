import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListVM } from './materials-vm.models';
import { MaterialsVM } from '../../../../vm/materials-vm';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MaterialsCardComponent, MatProgressBarModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {

  @Input({required: true})
  materials!: MaterialsListVM;

  @Output()
  deleteMaterial = new EventEmitter();

  public onDeleteMaterial(material: MaterialsVM): void {
    this.deleteMaterial.emit(material);
  }
}
