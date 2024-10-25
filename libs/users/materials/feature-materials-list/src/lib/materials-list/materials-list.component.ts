import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MaterialsListVM } from './materials-list.vm';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsListComponent {
  @Input({ required: true }) materialVm!: MaterialsListVM;
  @Output() deleteMaterial = new EventEmitter<number>();

  public onDeleteMaterial(materialId: number): void {
    this.deleteMaterial.emit(materialId)
  }
}
