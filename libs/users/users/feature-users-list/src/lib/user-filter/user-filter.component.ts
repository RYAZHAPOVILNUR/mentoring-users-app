import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { setUsersFilter, UsersState } from '@users/users/data-access';
// import { UsersState } from '@users/core/data-access';
import { Store } from '@ngrx/store';

@Component({
  selector: 'users-user-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss'],
})
export class UserFilterComponent {
  constructor(private store: Store<UsersState>) {}
  nameFilterControl = new FormControl('');

  applyFilter(filterValue: string) {
    this.store.dispatch(setUsersFilter({ filter: { name: filterValue } }));
    console.log(filterValue);
  }
}
