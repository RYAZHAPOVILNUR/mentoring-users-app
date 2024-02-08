import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsFolderComponent } from '../materials-folder/materials-folder.component';
import { IFolder } from '../../../../data-access/src/lib/models/models';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'materials-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  imports: [CommonModule, MaterialsFolderComponent, MatProgressBarModule, MatGridListModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss']
})
export class MaterialsListComponent {
  @Input({ required: true })
  foldersVM!: {
    folders: IFolder[],
    isLoading: boolean
  };

  @Output()
  folderId = new EventEmitter<number>();

  upFolderId(folderId: number) {
    this.folderId.emit(folderId);
  }
}
