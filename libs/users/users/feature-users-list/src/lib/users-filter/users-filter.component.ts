import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  standalone: true
})
export class UsersFilterComponent {
  private readonly destroyRef = inject(DestroyRef);
  public readonly searchUsers = new FormControl('');

  @Output() filterUsers = new EventEmitter<string>();

  constructor() {
    this.searchUsers.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
        )
      .subscribe((value) => this.filterUsers.emit(value ?? ''.trim()))
  }
}
