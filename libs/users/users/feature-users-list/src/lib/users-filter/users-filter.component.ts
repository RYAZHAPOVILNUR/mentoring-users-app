import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setUsersFilter } from '@users/users/data-access';
import { Subject, debounceTime, distinctUntilChanged, fromEvent, map, takeUntil, tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  imports: [FormsModule, ReactiveFormsModule],
})
export class UsersFilterComponent implements OnDestroy, OnInit {
  constructor(private store: Store) {}

  ngOnDestroy(): void {
    takeUntilDestroyed();
  }

  ngOnInit(): void {
    const inputEl = document.getElementById('filter') as HTMLInputElement;

    fromEvent(inputEl, 'input')
      .pipe(
        debounceTime(600),
        map((event) => (event.target as HTMLInputElement).value),
        distinctUntilChanged(),
        tap((value) => {
          this.store.dispatch(setUsersFilter({ filter: { name: value } }));
        })
      )
      .subscribe();
  }
}
/*export class UsersFilterComponent {
  constructor(private store: Store) {}
  ///1 вариант
filter(event: Event) {
    this.store.dispatch(setUsersFilter({ filter: { name: (event.target as HTMLInputElement).value } }));
  }
}*/

///2 вариант
/*export class UsersFilterComponent {
  name!: string; ///2х стороннее связывание с помощью [(ngModel)]
  constructor(private store: Store) {}

  filter() {
    this.store.dispatch(setUsersFilter({ filter: { name: this.name } }));
  }
}
*/
