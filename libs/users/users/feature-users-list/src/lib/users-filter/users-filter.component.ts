import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setUsersFilter } from 'libs/users/users/data-access/src/lib/+state/users.actions';

@Component({
  selector: 'users-users-filter',
  standalone: true,
  // imports: [CommonModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent implements OnInit {
  nameControl = new FormControl('');

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.nameControl.valueChanges.subscribe((name) => {
      this.store.dispatch(setUsersFilter({ filter: { name: name ?? '' } }));
    });
  }
}