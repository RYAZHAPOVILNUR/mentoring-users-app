import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mat } from '@users/materials/data-access';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';

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
  @Input() vm!: {
    mats: Mat[],
    status: string
  };
  
  @Output() deleteMat = new EventEmitter();

  onDeleteMat(id: number){
    this.deleteMat.emit(id)
  }
}
