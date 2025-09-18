import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { LoadingStatus } from '@shared/util-store';
import { Material } from '@users/materials/data-access-materials';

import { MaterialsCardComponent } from '../materials-card/materials-card.component';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatIconModule, MatButtonModule, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
})
export class MaterialsListComponent {
  @Input() materials: Material[] = [];
  @Input() status: LoadingStatus = 'init';
  @Input() error: string | null = null;
  @Input() folderTitle = '';

  @Output() deleteMaterial = new EventEmitter<number>();
  @Output() openMaterial = new EventEmitter<Material>();
  @Output() backToFolders = new EventEmitter<void>();

  onDeleteMaterial(id: number): void {
    this.deleteMaterial.emit(id);
  }

  onOpenMaterial(material: Material): void {
    this.openMaterial.emit(material);
  }

  onBackToFolders(): void {
    this.backToFolders.emit();
  }
}
