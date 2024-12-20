/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { filter, Subject, takeUntil } from 'rxjs';
import { UsersFacade } from '@users/users/data-access';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent {
  filterUsers = new FormControl('');
  private readonly usersFacade = inject(UsersFacade);
  private readonly onDestroy$ = new Subject<void>();

  ngOnInit(): void {
    this.filterUsers.valueChanges
      .pipe(
        filter((value): value is string => value !== null),
        takeUntil(this.onDestroy$)
      )
      .subscribe((value) => this.usersFacade.filterUser(value));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
