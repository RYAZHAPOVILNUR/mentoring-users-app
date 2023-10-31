import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from '../users-list/users-list.component';
import { UsersListContainerStore } from './users-list-container.store';
import { UsersVM } from '../../../../users-vm';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { UsersFacade, UsersFilter } from '@users/users/data-access';
import { Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { CreateUsersButtonComponent } from '@users/feature-users-create';
import { Store, select } from '@ngrx/store';
import { selectQueryParam } from '@users/core/data-access';
import { Subscription } from 'rxjs';

@Component({
  selector: 'users-list-container',
  standalone: true,
  imports: [
    CommonModule,
    UsersListComponent,
    MatButtonModule,
    MatDialogModule,
    LetDirective,
    CreateUsersButtonComponent
  ],
  templateUrl: './users-list-container.component.html',
  styleUrls: ['./users-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsersListContainerStore]
})
export class UsersListContainerComponent implements OnDestroy {
  private readonly componentStore = inject(UsersListContainerStore);
  public usersFacade = inject(UsersFacade);
  private readonly router = inject(Router);
  public readonly users$ = this.componentStore.users$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  public readonly loggedUser$ = this.usersFacade.loggedUser$;
  public readonly filterParams$ = this.usersFacade.filter$;

  onDeleteUser(user: UsersVM) {
    this.componentStore.deleteUser(user)
  }
  onFilterUsers(filterParams: UsersFilter) {
    this.usersFacade.filterUser(filterParams);
    this.router.navigate(['/admin/users'], { queryParams: { name: filterParams.name }});
  }

  onRedirectToEdit({ id, editMode }: { id: number, editMode: boolean }) {
    this.router.navigate(['/admin/users', id], { queryParams: { edit: editMode } });
  }
  ngOnDestroy() {
    this.usersFacade.filterUser({name:''})
  }
}


