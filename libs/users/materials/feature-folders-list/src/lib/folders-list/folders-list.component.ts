import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IFolder } from '../../../../data-access/src/lib/models/folder.interface';
import { DeepReadonly } from '@users/core/utils';
import { Store } from '@ngrx/store';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, FoldersCardComponent, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersListComponent {
  store = inject(Store)
  @Input({ required: true }) folderVm!: FoldersListVM
  @Output() deleteFolder = new EventEmitter<number>();

  public onDeleteFolder(folderId: number): void {
    this.deleteFolder.emit(folderId);
  }
}
export type FoldersListVM = DeepReadonly<{
  folders: FoldersVM[];
  // status: string;
  // error: Error | null

}>;

export type FoldersVM = DeepReadonly<IFolder>;
