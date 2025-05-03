import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from '../users-list/users-list.component';
import { UsersListContainerStore } from './users-list-container.store';
import { UsersVM } from '../../../../users-vm';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { filteredUsers, UsersFacade } from '@users/users/data-access';
import { Router, NavigationEnd } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { CreateUsersButtonComponent } from '@users/feature-users-create';
import { Subscription } from 'rxjs';
import { AfterViewInit } from '@angular/core';
import { UserListFilterComponent } from "../user-list-filter/user-list-filter.component";
import { Store } from '@ngrx/store';


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
    UserListFilterComponent
],
  templateUrl: './users-list-container.component.html',
  styleUrls: ['./users-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsersListContainerStore],
})
export class UsersListContainerComponent{
  
  @ViewChild('userFilter') userFilter!: UserListFilterComponent;
  
  // ngOnInit(): void {
  //   this.navigationSubscription = this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       if (this.router.url === '/admin/users') {
          
  //       }
  //     }
  //   });
  // }
  
  private readonly store = inject(Store); // Инициализация store
  private readonly componentStore = inject(UsersListContainerStore);
  public usersFacade = inject(UsersFacade);
  public readonly users$ = this.store.select(filteredUsers); // Используем отфильтрованных пользователей
  
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  public readonly loggedUser$ = this.usersFacade.loggedUser$;
  private readonly router = inject(Router);
  private navigationSubscription!: Subscription;
  

  
  onDeleteUser(user: UsersVM) {
    this.componentStore.deleteUser(user);
  }

  onRedirectToEdit({ id, editMode }: { id: number; editMode: boolean }) {
    this.router.navigate(['/admin/users', id], {
      queryParams: { edit: editMode },
    });
  }
  
  onFormNameChange(name: string){
    this.usersFacade.setUsersFilter({name});
  }
  

}

