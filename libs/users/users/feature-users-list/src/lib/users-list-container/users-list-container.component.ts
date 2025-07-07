import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { UsersFacade } from '@users/users/data-access';
import { UsersListContainerStore } from './users-list-container.store';
import { UsersListComponent } from '../users-list/users-list.component';
import { UsersVM } from '../users-vm';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersFilterComponent } from "./users-filters-ui/users-filter.component";

@Component({
  standalone: true,
  imports: [CommonModule, UsersListComponent, MatButtonModule, MatDialogModule, LetDirective, ReactiveFormsModule, UsersFilterComponent],
  templateUrl: './users-list-container.component.html',
  styleUrls: ['./users-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsersListContainerStore],
})
export class UsersListContainerComponent {
  private readonly componentStore = inject(UsersListContainerStore);
  private readonly router = inject(Router);
  public usersFacade = inject(UsersFacade);
  public readonly users$ = this.componentStore.users$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  public readonly loggedUser$ = this.usersFacade.loggedUser$;

  form = new FormGroup({
        usersFilters: new FormControl(''),
    })

  onDeleteUser(user: UsersVM) {
    this.componentStore.deleteUser(user);
  }

  onRedirectToEdit({ id, editMode }: { id: number; editMode: boolean }) {
    this.router.navigate(['/admin/users', id], {
      queryParams: { edit: editMode },
    });
  }
}
