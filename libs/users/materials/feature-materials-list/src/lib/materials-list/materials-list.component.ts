import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsListVM } from './materials-list-view-model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Material } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsCardComponent,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
})
export class MaterialsListComponent {
  private readonly activatedRouter = inject(ActivatedRoute);
  public readonly titleFolder = this.activatedRouter.snapshot.queryParams['title'];
  @Input({required: true}) vm!: MaterialsListVM;
  @Output() content = new EventEmitter;
  @Output() id_material = new EventEmitter;

  onShowContent(material: Material){
    this.content.emit(material);
  }
  onDeleteMaterial(id_material: number){
    this.id_material.emit(id_material);
  }
}
