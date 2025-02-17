import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FolderDTO } from '@users/materials/data-access';
import { FoldersCardComponent } from "../folders-card/folders-card.component";
import { FoldersList } from './folder-list.model';



@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    NgIf, FoldersCardComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  
  @Input({ required: true })
  vm!: FoldersList;


  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter();

  onDeleteFolder(folder: FolderDTO) {
    this.deleteFolder.emit(folder);
  }

  onOpenFolder(id: number) {
    this.openFolder.emit(id)
  }
  
}
