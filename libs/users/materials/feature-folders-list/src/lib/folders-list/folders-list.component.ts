import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Folder } from '@users/materials/data-access';
import { FoldersCardComponent } from '../folders-card/folders-card.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
})
export class FoldersListComponent {
  @Input({ required: true })
  folders!: Folder[];

  @Output()
  removeFolder = new EventEmitter<number>();

  public onRemoveFolder(id: number): void {
    this.removeFolder.emit(id);
  }
}
