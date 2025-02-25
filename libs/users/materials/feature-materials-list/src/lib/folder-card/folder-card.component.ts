import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FoldersVM} from '../../../../folder-vm'
import { FolderEntity } from '@users/core/data-access';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'folder-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, MatIconModule, MatTooltipModule, MatMenuModule],
  templateUrl: './folder-card.component.html',
  styleUrls: ['./folder-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderCardComponent {
  @Input({ required: true })
  folder!: FoldersVM;

  @Input({ required: true })
  openedFolder!: FolderEntity;
  
  @Output() deleteFolder = new EventEmitter();
  @Output() redirectToEdit = new EventEmitter();
  
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  onOpenMenu(event: Event) {
    event.stopPropagation();
    this.trigger.openMenu();
  }

  onDeleteFolder(event: Event) {
    this.deleteFolder.emit();
  }
  
  redirectToEditPage(editMode: boolean, event: Event) {
    const emitData = {
      id: this.folder.id,
      editMode,
    };
    this.redirectToEdit.emit(emitData);
  }
}

