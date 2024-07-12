import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Material } from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { defineLinkType, MaterialFileType } from '@users/utils';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input({required: true})
  material!: Material;
  @Output() backOnFolders = new EventEmitter<void>();
  @Output() deleteMaterial = new EventEmitter<Material>();

  public readonly MaterialFileType = MaterialFileType;
  public readonly defineLinkType = defineLinkType;

  public onDeleteMaterial(material: Material): void {
    this.deleteMaterial.emit(material);
  }
}
