import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';

import { UserVM } from '@users/shared/data-access-models';
import { UsersFacade } from '@users/users/data-access-user';

import { UserListContainerStore } from './user-list-container.store';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { UserRedirectPayload } from '../../interfaces/user-redirect-payload.interface';

@Component({
  standalone: true,
  imports: [UserListComponent, MatButtonModule, MatDialogModule, LetDirective],
  templateUrl: './user-list-container.component.html',
  styleUrls: ['./user-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserListContainerStore],
})
export class UserListContainerComponent {
  private readonly router = inject(Router);
  private readonly usersFacade = inject(UsersFacade);
  private readonly componentStore = inject(UserListContainerStore);

  readonly users$ = this.componentStore.users$;
  readonly status$ = this.componentStore.status$;
  readonly errors$ = this.componentStore.errors$;
  readonly loggedUser$ = this.usersFacade.loggedUser$;

  onDeleteUser(user: UserVM): void {
    this.componentStore.deleteUser(user);
  }

  onRedirectToEdit({ id, editMode }: UserRedirectPayload): void {
    this.router.navigate(['/admin/users', id], {
      queryParams: { edit: editMode },
    });
  }
}
