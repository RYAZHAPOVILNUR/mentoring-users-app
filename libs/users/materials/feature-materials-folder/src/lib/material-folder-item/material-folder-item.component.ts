import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FolderEntity } from 'libs/users/materials/data-access/src/lib/model/material.entity';
@Component({
  selector: 'users-material-folder-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './material-folder-item.component.html',
  styleUrls: ['./material-folder-item.component.scss'],
})
export class MaterialFolderItemComponent {
  @Input({ required: true }) folder!:FolderEntity;
  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter();

  


  onDeleteFolder(folder: FolderEntity) {
    this.deleteFolder.emit(folder)
  }

  onOpenFolder(folder:FolderEntity){
    this.openFolder.emit(folder.id)
  }
}
