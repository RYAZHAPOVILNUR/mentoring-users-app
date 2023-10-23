import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject, OnInit, OnDestroy, DestroyRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from '../users-list/users-list.component';
import { UsersListContainerStore } from './users-list-container.store';
import { UsersVM } from '../../../../users-vm';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { UsersFacade } from '@users/users/data-access';
import { ActivatedRoute, Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { CreateUsersButtonComponent } from '@users/feature-users-create';
import { selectQueryParam } from "@users/core/data-access";
import { Store } from "@ngrx/store";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

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
export class UsersListContainerComponent implements OnInit, OnDestroy {
  private readonly componentStore = inject(UsersListContainerStore);
  public usersFacade = inject(UsersFacade);
  public readonly users$ = this.componentStore.filteredUsers$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  public readonly loggedUser$ = this.usersFacade.loggedUser$;
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  private readonly store = inject(Store)

  ngOnInit() {
    this.store.select(selectQueryParam('name'))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((filterValue) => {
          if(filterValue) {
            this.usersFacade.filterUsers(filterValue);
          }
        })
  }

  onDeleteUser(user: UsersVM) {
    this.componentStore.deleteUser(user)
  }

  onRedirectToEdit({ id, editMode }: { id: number, editMode: boolean }) {
    this.router.navigate(['/admin/users', id], { queryParams: { edit: editMode } });
  }

  onFilterUsers(name: string) {
    this.usersFacade.filterUsers(name);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { name },
    });
  }

  ngOnDestroy() {
    this.usersFacade.filterUsers('');
  }
}
