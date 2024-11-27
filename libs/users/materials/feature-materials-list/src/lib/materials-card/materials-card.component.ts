import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDTO } from '@users/materials/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
})
export class MaterialsCardComponent {
  @Input() material!: MaterialDTO;
  @Output() deleteMaterial = new EventEmitter();
  @Output() openMaterial = new EventEmitter();
  onDeleteMaterial(id: number) {
    this.deleteMaterial.emit(id);
  }
  onOpenMaterial(material: MaterialDTO) {
    this.openMaterial.emit(material);
  }
  dateFormat(time: number): string {
    const date = new Date(time);
    return `${date.getDate()}
    ${date.toLocaleString('default', { month: 'short' }).slice(0, -1)}
    ${date.getFullYear()}`;
  }
}
