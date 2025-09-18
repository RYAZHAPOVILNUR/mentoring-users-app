import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FileTypeService } from '@shared/util-file-type';
import { Material } from '@users/materials/data-access-materials';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input({ required: true }) material!: Material;
  private readonly fileTypeService = inject(FileTypeService);
  isHovered = false;

  @Output() deleteMaterial = new EventEmitter<number>();
  @Output() openMaterial = new EventEmitter<Material>();

  getFileIcon(): string {
    return this.fileTypeService.getFileIcon(this.material.material_link);
  }

  getFileType(): string {
    return this.fileTypeService.getFileType(this.material.material_link);
  }

  getFileIconClass(): string {
    return this.fileTypeService.getFileIconClass(this.material.material_link);
  }

  onDelete(event: MouseEvent): void {
    event.stopPropagation();
    this.deleteMaterial.emit(this.material.id);
  }

  onOpen(): void {
    this.openMaterial.emit(this.material);
  }
}
