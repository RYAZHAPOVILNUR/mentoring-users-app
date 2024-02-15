import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IDeleteItem, IMaterial } from '../../../../data-access/src/lib/models/models';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DELETE_ITEM_TYPE, MATERIAL_ICONS } from '../../../../util/constant';
import { getFormattedDate } from '../../../../util/utils';
import { MaterialsService } from '../../../../service/materialsService';

@Component({
  selector: 'resource-item',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './resource-item.component.html',
  styleUrls: ['./resource-item.component.scss']
})
export class ResourceItemComponent {
  private readonly materialService: MaterialsService = inject(MaterialsService);
  @Input({ required: true })
  material!: IMaterial;

  public readonly folderType = DELETE_ITEM_TYPE.MATERIAL;

  getResourceIcon(link: string): string {
    const ending = link.slice(link.length - 4, link.length);
    //@ts-ignore
    return MATERIAL_ICONS[ending] || MATERIAL_ICONS['video'];
  }

  protected readonly getFormatedDate = getFormattedDate;

  sendMaterialId(material: IDeleteItem): void {
    this.materialService.setDeleteId(material);
  }
}


