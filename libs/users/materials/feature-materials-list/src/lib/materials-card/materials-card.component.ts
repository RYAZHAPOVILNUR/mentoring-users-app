import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Material } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
})
export class MaterialsCardComponent {
  @Input({required: true}) materials!: Material;
  @Output() content = new EventEmitter;
  @Output() materials_id = new EventEmitter;

  showContent(){
    this.content.emit();
  }

  onDeleteMaterials(){
    this.materials_id.emit();
  }
}
