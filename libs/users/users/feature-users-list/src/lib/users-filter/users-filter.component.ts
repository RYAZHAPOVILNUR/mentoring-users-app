import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import * as UsersActions from '../../../../data-access/src/lib/+state/users.actions';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  private readonly store = inject(Store);

  usersFilter = new FormControl('');

  ngOnInit(): void {
    this.usersFilter.valueChanges.pipe(debounceTime(200), takeUntil(this.destroy$)).subscribe((value) => {
      this.store.dispatch(UsersActions.setUsersFilter({ filter: { name: value ?? '' } }));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
