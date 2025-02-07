import { ChangeDetectionStrategy, Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListVM } from './folders-list-view-model';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true })
  vm!: FoldersListVM;

  // @Output() deleteUser = new EventEmitter();
  // @Output() redirectToEdit = new EventEmitter();

  // onDeleteUser(user: UsersVM) {
  //   this.deleteUser.emit(user);
  // }

  // onRedirectToEdit(editData: { id: number; editMode: boolean }) {
  //   this.redirectToEdit.emit(editData);
  // }
}
