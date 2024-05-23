import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent {
  public readonly userName = new FormControl('', {nonNullable: true});
  private readonly usersFacade = inject(UsersFacade);

  public filterUsers() {
    this.usersFacade.setUsersFilter({filter: {name: this.userName.value}});
  }
}
