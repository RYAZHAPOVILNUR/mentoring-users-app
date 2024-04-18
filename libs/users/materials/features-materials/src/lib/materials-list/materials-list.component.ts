import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListVM } from './materials-view.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsFolderCardComponent } from '../materials-folder-card/materials-folder-card.component';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MaterialsFolderCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true })
  vm!: FoldersListVM;

  @Output() deleteFolder = new EventEmitter();

  public onDeleteFolder(id: unknown): void {
    this.deleteFolder.emit(id);
  }
}
