import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListVM } from './materials-list-view.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MaterialsEntity } from '@users/users/materials/data-access';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MaterialsCardComponent,
  ],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({required: true})
  vm!: MaterialsListVM;

  @Output()
  moveBack = new EventEmitter();
  @Output()
  openMaterial = new EventEmitter();
  @Output()
  deleteMaterial = new EventEmitter();

  onBackClicked() {
    this.moveBack.emit();
  }

  onOpenMaterial(material: MaterialsEntity) {
    this.openMaterial.emit(material);
  }

  onDeleteMaterial(material: MaterialsEntity) {
    this.deleteMaterial.emit(material);
  }
}
