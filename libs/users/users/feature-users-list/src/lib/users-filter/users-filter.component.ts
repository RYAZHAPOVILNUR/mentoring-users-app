/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { UsersFacade } from '@users/users/data-access';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent {
  private usersFacade = inject(UsersFacade);
  public filterName = new FormControl<string>('', { nonNullable: true });

  filterByName() {
    this.usersFacade.filterUsers(this.filterName.value);
  }
}
