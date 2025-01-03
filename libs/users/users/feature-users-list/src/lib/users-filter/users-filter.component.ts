import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { UsersFacade } from '@users/users/data-access';


@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent implements OnInit {
  private readonly usersFacade = inject(UsersFacade)
  private readonly store = inject(Store)
  usersFilter = new FormControl('');
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.usersFilter.valueChanges
      .pipe(debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.usersFacade.setFilters({ name: value ?? '' });
      });
  }
}
