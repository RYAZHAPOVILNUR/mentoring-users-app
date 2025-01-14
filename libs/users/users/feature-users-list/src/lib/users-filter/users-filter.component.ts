import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { setUsersFilter } from '@users/users/data-access';

// eslint-disable-next-line @nx/enforce-module-boundaries
//import { User } from '../../../../../../../apps/users/src/app/user.interface';

@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class UsersFilterComponent implements OnInit {
  filterName = new FormControl('');
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.filterName.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((value: string | null) => {
      this.store.dispatch(setUsersFilter({ filter: { name: value || '' } }));
    });
  }
}
