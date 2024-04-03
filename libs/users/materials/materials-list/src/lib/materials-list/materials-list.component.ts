import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MaterialsListVM } from './materials-list-view-model';
import { RouterLink } from '@angular/router';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialDTO } from '@users/materials/data-access';
import { PushPipe } from '@ngrx/component';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MaterialsCardComponent, MatProgressBarModule, PushPipe, RouterLink],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true }) vm!: MaterialsListVM;


  @Output() deleteMaterial = new EventEmitter<number>();
  @Output() revealMaterial = new EventEmitter<Pick<MaterialDTO, 'title' | 'material_link'>>();

   onDeleteMaterial(id: number): void {
    this.deleteMaterial.emit(id);
  }

  onRevealMaterial(data: Pick<MaterialDTO, 'title' | 'material_link'>): void {
    this.revealMaterial.emit(data);
  }
}
