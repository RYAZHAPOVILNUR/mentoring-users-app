import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';

import { UserVM } from '@users/shared/data-access-models';
import { UsersFacade } from '@users/users/data-access-user';

import { UserListContainerStore } from './user-list-container.store';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { UsersFormComponent } from "../../components/users-filter/users-filter.component";

@Component({
  standalone: true,
  imports: [CommonModule, UserListComponent, MatButtonModule, MatDialogModule, LetDirective, UsersFormComponent],
  templateUrl: './user-list-container.component.html',
  styleUrls: ['./user-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserListContainerStore],
})
export class UserListContainerComponent {
  private readonly componentStore = inject(UserListContainerStore);
  private readonly router = inject(Router);
  public usersFacade = inject(UsersFacade);
  public readonly users$ = this.componentStore.users$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  public readonly loggedUser$ = this.usersFacade.loggedUser$;

  onDeleteUser(user: UserVM) {
    this.componentStore.deleteUser(user);
  }

  onRedirectToEdit({ id, editMode }: { id: number; editMode: boolean }) {
    this.router.navigate(['/admin/users', id], {
      queryParams: { edit: editMode },
    });
  }
}
