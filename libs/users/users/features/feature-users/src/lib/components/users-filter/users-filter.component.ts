import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setUsersFilter } from 'libs/users/users/data-access/data-access-user/src/lib/+state/users.actions';

@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
})
export class UsersFilterComponent implements OnInit, OnChanges {
  @Input() users: { name: string }[] = [];

  nameFilter = new FormControl('');
  filteredUsers: { name: string }[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.filteredUsers = this.users;

    this.nameFilter.valueChanges.subscribe((value) => {
      const filterValue = value ? value : '';
      this.filteredUsers = this.users.filter((user) => user.name.toLowerCase().includes(filterValue.toLowerCase()));

      this.store.dispatch(setUsersFilter({ filter: { name: filterValue } }));
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['users']) {
      this.filteredUsers = this.users;
    }
  }
}
