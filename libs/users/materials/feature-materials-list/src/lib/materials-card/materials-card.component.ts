import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Material } from '@users/materials/data-access';
import { ContentModel } from '../../../../feature-materials-content/src/lib/materials-content/content.model';

@Component({
  selector: 'materials-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsCardComponent implements OnInit {
  public _material!: Material;
  public materialType: string = '';
  @Input({ required: true })
  set materialItem(value: Material) {
    this._material = value;
    this.materialType = this.checkMaterialType();
  };
  @Output()
  public removeMaterialEmit: EventEmitter<{ materialId: number, materialTitle: string }> = new EventEmitter<{ materialId: number, materialTitle: string }>();
  @Output()
  public openMaterialEmit: EventEmitter<ContentModel> = new EventEmitter<ContentModel>();

  ngOnInit(): void {
    this.materialType = this.checkMaterialType();
  }

  public checkMaterialType(): string {
    const link: string = this._material.material_link;
    if (link.includes('https://www.youtube.com')) return 'youtube';
    if (link.includes('.pdf')) return 'pdf';
    if (link.includes('.mp3')) return 'mp3';
    return 'other';
  }

  public openMaterial(): void {
    const materialData: ContentModel = {
      id: this._material.id,
      title: this._material.title,
      material_link: this._material.material_link,
      created_at: this._material.created_at,
      contentType: this.checkMaterialType()
    };
    this.openMaterialEmit.emit(materialData);
  }

  public removeMaterial(): void {
    this.removeMaterialEmit.emit({ materialId: this._material.id, materialTitle: this._material.title })
  }
}
