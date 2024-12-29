import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {UsersFacade} from '@users/users/data-access';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { select, Store } from '@ngrx/store';
import { selectQueryParam } from '@users/core/data-access';
import { map } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import {usersFilter} from '@users/users/data-access';

@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatIconModule, NgIf],
  standalone: true,
})
export class UsersFilterComponent implements OnInit {
  private router = inject(Router);
  public store = inject(Store);
  private usersFacade: UsersFacade = inject(UsersFacade);

  constructor() {
    this.usersFilter.valueChanges.subscribe((value) => {
      this.updateUsersFilterUrlParam(value || '');
      this.usersFacade.setUsersFilter(value || '');
    });
  }
  ngOnInit() {
    this.usersFilterUrlParam$.subscribe((value) => this.usersFilter.patchValue(value, { emitEvent: false }));
  }

  public usersFilter = new FormControl('');
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

}
