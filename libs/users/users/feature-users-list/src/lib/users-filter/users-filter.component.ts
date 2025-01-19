import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { select, Store } from '@ngrx/store';
import { selectQueryParam } from '@users/core/data-access';
import { map } from 'rxjs';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatIconModule, NgIf, MatButtonModule],
  standalone: true,
})
export class UsersFilterComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly usersFacade: UsersFacade = inject(UsersFacade);
  public usersFilter = new FormControl('');

  constructor() {
    this.usersFilter.valueChanges.subscribe((value) => {
      this.updateUsersFilterUrlParam(value || '');
      this.usersFacade.setUsersFilter(value || '');
    });
  }

  ngOnInit() {
    this.usersFilterUrlParam$.subscribe((value) => this.usersFilter.patchValue(value, { emitEvent: false }));
  }

  private usersFilterUrlParam$ = this.store.pipe(
    select(selectQueryParam('filter')),
    map((filterValue) => filterValue || '')
  );

  public updateUsersFilterUrlParam(filter: string) {
    this.router.navigate([], {
      queryParams: { filter },
      queryParamsHandling: 'merge',
    });
  }

  public hasText(): boolean {
    return !!this.usersFilter.value?.trim();
  }
}
