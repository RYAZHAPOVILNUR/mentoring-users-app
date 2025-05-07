import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from '../users-list/users-list.component';
import { UsersListContainerStore } from './users-list-container.store';
import { UsersVM } from '../../../../users-vm';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { UsersFacade } from '@users/users/data-access';
import { Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { CreateUsersButtonComponent } from '@users/feature-users-create';
import { UsersFilterComponent } from "../users-filter.component/users-filter.component";

@Component({
  selector: 'users-list-container',
  standalone: true,
  imports: [
    CommonModule,
    UsersListComponent,
    MatButtonModule,
    MatDialogModule,
    LetDirective,
    CreateUsersButtonComponent,
    UsersFilterComponent
],
  templateUrl: './users-list-container.component.html',
  styleUrls: ['./users-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsersListContainerStore],
})
export class UsersListContainerComponent {
  private readonly componentStore = inject(UsersListContainerStore);
  public usersFacade = inject(UsersFacade);
  public readonly users$ = this.componentStore.users$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  public readonly loggedUser$ = this.usersFacade.loggedUser$;
  private readonly router = inject(Router);

  onDeleteUser(user: UsersVM) {
    this.componentStore.deleteUser(user);
  }

  onRedirectToEdit({ id, editMode }: { id: number; editMode: boolean }) {
    this.router.navigate(['/admin/users', id], {
      queryParams: { edit: editMode },
    });
  }
}
