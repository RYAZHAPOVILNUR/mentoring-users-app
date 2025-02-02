import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TFoldersListVM, TFolderVM } from '@users/materials/data-access';

@Component({
  selector: 'materials-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true })
  vm!: TFoldersListVM;

  @Output() deleteFolder = new EventEmitter();

  @Output() redirectToMaterials = new EventEmitter();

  public onDeleteFolder(folder: TFolderVM): void {
    this.deleteFolder.emit(folder);
  }

  public onRedirectToFolderPage(id: number): void {
    this.redirectToMaterials.emit(id);
  }
}
