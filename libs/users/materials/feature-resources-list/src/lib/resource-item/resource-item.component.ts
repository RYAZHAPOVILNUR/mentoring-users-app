import { Component, DestroyRef, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IDeleteItem, IMaterial } from '../../../../data-access/src/lib/models/models';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DELETE_ITEM_TYPE, MATERIAL_ICONS } from '../../../../util/constant';
import { getFormattedDate } from '../../../../util/utils';
import { MaterialsService } from '../../../../service/materialsService';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddMaterialModalComponent } from '../add-material-modal/add-material-modal.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResourceModalComponent } from '../resource-modal/resource-modal.component';

@Component({
  selector: 'resource-item',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './resource-item.component.html',
  styleUrls: ['./resource-item.component.scss']
})
export class ResourceItemComponent {
  private readonly materialService: MaterialsService = inject(MaterialsService);
  public dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  public readonly getFormattedDate = getFormattedDate;
  public readonly folderType = DELETE_ITEM_TYPE.MATERIAL;

  @Input({ required: true })
  material!: IMaterial;

  getResourceIcon(link: string): string {
    const ending = link.slice(link.length - 4, link.length);
    //@ts-ignore
    return MATERIAL_ICONS[ending] || MATERIAL_ICONS['video'];
  }

  sendMaterialId(material: IDeleteItem): void {
    this.materialService.setDeleteId(material);
  }

  openView() {
    const addMaterialRef: MatDialogRef<ResourceModalComponent> = this.dialog.open(ResourceModalComponent, {
      data: {
        materialLink: this.material.material_link,
        materialType: this.getResourceIcon(this.material.material_link),
        materialTitle: this.material.title
      }
    });
    addMaterialRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}


