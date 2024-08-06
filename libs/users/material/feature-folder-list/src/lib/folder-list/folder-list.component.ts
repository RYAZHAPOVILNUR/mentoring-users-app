import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderCardComponent } from '../folder-card/folder-card.component';
import { FolderListVM } from './folder-list-view-model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-folder-list',
  standalone: true,
  imports: [CommonModule, FolderCardComponent, MatProgressBarModule, MatIconModule],
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderListComponent {
  @Input() fvm!: FolderListVM;
  @Output() redirectMaterial = new EventEmitter();
  @Output() deleteFolder = new EventEmitter();
  @Output() createFolder = new EventEmitter();

  public onRedirectMaterial({ name, id }: { name: string; id: number }): void {
    this.redirectMaterial.emit({ name, id });
  }

  public onDeleteFolder(id: number): void {
    this.deleteFolder.emit(id);
  }
}
