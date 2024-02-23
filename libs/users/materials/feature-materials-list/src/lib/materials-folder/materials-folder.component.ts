import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IDeleteItem, IFolder } from '../../../../data-access/src/lib/models/models';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MaterialsService } from '../../../../service/materialsService';
import { Router } from '@angular/router';
import { DELETE_ITEM_TYPE } from '../../../../util/constant';

@Component({
  selector: 'materials-folder',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './materials-folder.component.html',
  styleUrls: ['./materials-folder.component.scss']
})
export class MaterialsFolderComponent {
  @Input({ required: true })
  folder!: IFolder;
  private readonly materialService = inject(MaterialsService);
  public readonly router = inject(Router);
  public readonly materialType = DELETE_ITEM_TYPE.FOLDER;

  sendFolderId(folder: IDeleteItem): void {
    this.materialService.setDeleteId(folder);
  }

  openFolder(folderId: string): void {
    this.router.navigate(['/folder', folderId]);
  }
}

