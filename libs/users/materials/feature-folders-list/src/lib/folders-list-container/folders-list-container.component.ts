import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFoldersButtonComponent } from '@libs/users/materials/feature-folders-create/feature-folders-create';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { Router } from '@angular/router';
import { FoldersListContainerStore } from './folders-list-container.store';
import { FoldersFacade } from '@libs/users/materials/state';
import { LetDirective } from '@ngrx/component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folders-list-container',
  standalone: true,
  imports: [CommonModule, CreateFoldersButtonComponent, FoldersListComponent, LetDirective],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {
  private readonly componentStore = inject(FoldersListContainerStore);
  public foldersFacade = inject(FoldersFacade);
  public readonly folders$ = this.componentStore.folders$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  private readonly router = inject(Router);

  // onDeleteUser(user: UsersVM) {
  //   this.componentStore.deleteUser(user);
  // }

  // onFilterUsers(name: string) {
  //   this.componentStore.filterUsers(name);
  // }

  // onRedirectToEdit({ id, editMode }: { id: number; editMode: boolean }) {
  //   this.router.navigate(['/admin/users', id], {
  //     queryParams: { edit: editMode },
  //   });
  // }
}
