import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as UsersActions from '../../../../data-access/src/lib/+state/users.actions';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss']
})
export class UsersFilterComponent implements OnInit{
  store = inject(Store);
  name = new FormControl('');

  ngOnInit() {
    this.setupSearchControl()
  }

  setupSearchControl() {
    this.name.valueChanges
      .pipe(debounceTime(50))
      .subscribe((value: string | null) => {
        this.filterApplied(value as string);
      });
  }

  filterApplied(value: string) {
    this.store.dispatch(UsersActions.setUsersFilter({ filter: { name: value } }));
  }
}
