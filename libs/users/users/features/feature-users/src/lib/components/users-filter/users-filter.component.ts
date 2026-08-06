import { Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { UsersFacade } from '@users/users/data-access-user';

@Component({
  selector: 'users-filter',
  imports: [MatLabel, MatFormField, MatInput],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
  standalone: true,
})
export class UsersFilterComponent {
  constructor(private readonly usersFacade: UsersFacade) {}

  onUserFilterChange(name: string): void {
    this.usersFacade.setUsersFilter({ name });
  }
}
