import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class UsersFilterComponent implements OnDestroy {
  constructor(private store: Store) {}

  private destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    const inputEl = document.getElementById('filter') as HTMLInputElement;

    fromEvent(inputEl, 'input')
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(600),
        map((event) => (event.target as HTMLInputElement).value),
        distinctUntilChanged(),
        tap((value) => {
          this.store.dispatch(setUsersFilter({ filter: { name: value } }));
          console.log(value);
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
}*/

///3 вариант
/*export class UsersFilterComponent implements OnInit {
  private destroy$ = new Subject<void>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.search$
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(500),
        map((event) => {
          return (event.target as HTMLInputElement).value;
        })
      )
      .subscribe((value) => {
        this.store.dispatch(setUsersFilter({ filter: { name: value } }));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private search$ = new Subject<Event>();

  filter(event: Event): void {
    this.search$.next(event);
  }
}*/
