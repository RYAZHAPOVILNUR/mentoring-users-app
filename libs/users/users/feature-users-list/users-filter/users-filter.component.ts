/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UsersFacade } from '@users/users/data-access';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent {
  public readonly filterUsers = new FormControl('');
  private readonly usersFacade = inject(UsersFacade);
  private readonly onDestroy$ = new Subject<void>();

  ngOnInit(): void {
    this.filterUsers.valueChanges
      .pipe(
        filter((value): value is string => value !== null),
        takeUntil(this.onDestroy$)
      )
      .subscribe((value) => {
        this.usersFacade.filterUser({ name: value });
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
