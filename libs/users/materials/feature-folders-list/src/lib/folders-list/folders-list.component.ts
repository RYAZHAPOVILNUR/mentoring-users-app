import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersListVM } from './folders-list-view-model';
import { FolderDTO } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, 
    MatCardModule, 
    MatIconModule, 
    MatTooltipModule, 
    FoldersCardComponent, 
    MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent{
    @Input({ required: true })
    vm!: FoldersListVM;

    @Output() deleteFolder = new EventEmitter();

    onDeleteFolder(folder: FolderDTO) {
    this.deleteFolder.emit(folder);
    }
    
    @Output() redirectToMaterials = new EventEmitter();
  
    onRedirectToMaterials( id: number ) {
      this.redirectToMaterials.emit(id);
    }
}
