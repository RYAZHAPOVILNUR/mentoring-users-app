import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersListVM } from './folders-list.vm';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, FoldersCardComponent, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersListComponent {
  @Input({ required: true }) folderVm!: FoldersListVM;
  @Output() deleteFolder = new EventEmitter<number>();
  @Output() openFolder = new EventEmitter<number>();

  public onDeleteFolder(folderId: number): void {
    this.deleteFolder.emit(folderId);
  }
  public onOpenFolder(folderId: number): void {
    this.openFolder.emit(folderId);
  }
}



