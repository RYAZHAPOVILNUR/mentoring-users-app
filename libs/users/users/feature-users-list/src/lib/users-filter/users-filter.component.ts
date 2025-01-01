import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';
import { debounceTime, distinctUntilChanged } from 'rxjs';


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
  private readonly destroyRef = inject(DestroyRef);
  usersFilter = new FormControl('');

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
