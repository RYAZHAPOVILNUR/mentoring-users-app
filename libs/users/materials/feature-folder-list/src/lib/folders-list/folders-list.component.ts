import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Folder } from '@users/materials/data-access';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [
    CommonModule,
    FoldersCardComponent,
    MatProgressBarModule,
    NgIf
  ],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
})
export class FoldersListComponent { 
  @Input() vm!: {
    folders: Folder[],
    status: string
  }
}
