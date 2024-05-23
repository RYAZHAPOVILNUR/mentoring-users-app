import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Material } from '@users/materials/data-access';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { LoadingStatus } from '@users/core/data-access';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MaterialsCardComponent
  ],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
})
export class MaterialsListComponent{
  @Input({required: true}) vm!: {
    mats: Material[],
    status: LoadingStatus
  };
  
  @Output() delete: EventEmitter<number> = new EventEmitter();

  public deleteMaterial(id: number){
    this.delete.emit(id)
  }
}
