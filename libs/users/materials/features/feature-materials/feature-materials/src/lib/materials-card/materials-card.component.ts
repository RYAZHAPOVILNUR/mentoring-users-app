import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Material } from '@users/data-access-materials';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'users-materials-card',
  imports: [CommonModule, CommonModule, DatePipe, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './materials-card.component.html',
  styleUrl: './materials-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input() material!: Material;
  public isHovered: boolean = false;

  @Output() deleteMaterial = new EventEmitter<Material>();
  @Output() viewMaterial = new EventEmitter<Material>();

  onDeleteMaterial(material: Material) {
    this.deleteMaterial.emit(material);
  }

  openMaterial(material: Material) {
    this.viewMaterial.emit(material);
  }
}
