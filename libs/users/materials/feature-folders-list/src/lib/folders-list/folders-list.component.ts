import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { FoldersListVM } from './folders-list-view-model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UsersCardComponent } from '../../../../../users/feature-users-list/src/lib/users-card/users-card.component';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FoldersDTO } from '../../../../../../core/data-access/src';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';

@Component({
  selector: 'folders-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, UsersCardComponent, FoldersCardComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true }) vmf!: FoldersListVM;

  @Output() deleteFolder = new EventEmitter();
  @Output() redirectToMaterials = new EventEmitter();


  ondeleteFolder(folder: FoldersDTO) {
    this.deleteFolder.emit(folder);
  };

  onRedirectToMaterials(editData: { id: number; editMode: boolean }) {
    this.redirectToMaterials.emit(editData);
  }
}
