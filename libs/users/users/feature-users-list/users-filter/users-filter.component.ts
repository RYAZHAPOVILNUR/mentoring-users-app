import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setUsersFilter } from 'libs/users/users/data-access/src/lib/+state/users.actions';
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule],
  templateUrl:'./users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent {

  nameControl = new FormControl('');

  constructor(private store: Store) {
    this.nameControl.valueChanges.subscribe(value => {
      this.store.dispatch(setUsersFilter({ filter: { name: value } }));
    });
  }
}

