import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListVM } from '@users/materials';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsDetailCardComponent } from '../materials-detail-card/materials-detail-card.component';

@Component({
  selector: 'users-materials-detail-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MaterialsDetailCardComponent],
  templateUrl: './materials-detail-list.component.html',
  styleUrls: ['./materials-detail-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsDetailListComponent {
  @Input({ required: true })
  vm!: MaterialsListVM;

  @Output() deleteMaterial = new EventEmitter();

  public onDeleteMaterial(id: number): void {
    this.deleteMaterial.emit(id);
  }
}
