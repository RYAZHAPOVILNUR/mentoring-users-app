import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IFolder } from '../../../../data-access/src/lib/models/models';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
  @Output()
  folderId = new EventEmitter<number>();

  sendFolderId(folderId: string): void {
    this.folderId.emit(+folderId);
  }
}
