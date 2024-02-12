import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IFolder } from '../../../../data-access/src/lib/models/models';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MaterialsService } from '../../../../service/materialsService';

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
  private readonly folderService = inject(MaterialsService);

  sendFolderId(folderId: string): void {
    this.folderService.setFolderId(+folderId);
  }

  openFolder() {
    console.log(1);
  }
}

