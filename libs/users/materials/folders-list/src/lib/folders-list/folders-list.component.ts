import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FoldersListVM } from './folders-list-view-model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, MatProgressBarModule, MatIconModule, MatButtonModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersListComponent {
  @Input({ required: true }) vm!: FoldersListVM;

  @Output() deleteFolder = new EventEmitter<number>();
  @Output() revealFolder = new EventEmitter<number>();

  onDeleteFolder(id: number): void {
    this.deleteFolder.emit(id);
  }

  onRevealFolder(id: number): void {
    this.revealFolder.emit(id);
  }
}
