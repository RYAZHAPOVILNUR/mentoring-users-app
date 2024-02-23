import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { UsersFacade } from '@users/users/data-access';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss']
})
export class UsersFilterComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  filterForm = new FormGroup({
    searchText: new FormControl(''),
    filterType: new FormControl('user'),
  });

  constructor(private usersFacade: UsersFacade) {
    this.filterForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$)
    ).subscribe(filterValues => {
      this.applyFilter();
    });
  }

  applyFilter() {
    const { searchText, filterType } = this.filterForm.value;

    if (filterType === 'user') {
      this.usersFacade.setUsersFilter({ name: searchText ?? '' });
    } else if (filterType === 'email') {
      this.usersFacade.setUsersFilter({ email: searchText ?? '' });
    }
  }

  ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
  }
}
