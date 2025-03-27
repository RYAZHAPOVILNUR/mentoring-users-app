import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUsersButtonComponent, UsersVM } from '@users/feature-users-create';
import { LetDirective } from '@ngrx/component';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersListContainerStore } from './folders-list-container.store';
import { FoldersVM } from '../../../../folders-vm';
import {
  FoldersAddButtonComponent
} from '../../../../feature-folders-create/folders-add-button/folders-add-button.component';
import {
  UsersListContainerStore
} from '../../../../../users/feature-users-list/src/lib/users-list-container/users-list-container.store';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, LetDirective, FoldersListComponent, FoldersAddButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  providers: [FoldersListContainerStore],

})
export class FoldersListContainerComponent {
  private readonly componentStore = inject(FoldersListContainerStore);
  public readonly folders$ = this.componentStore.folders$;

  onDeleteFolder(folder: FoldersVM) {
    this.componentStore.deleteFolder(folder);
  }
}
