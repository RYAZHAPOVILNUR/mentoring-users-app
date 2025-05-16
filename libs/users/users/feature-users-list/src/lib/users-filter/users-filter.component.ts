import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent {
  readonly name = new FormControl('', { nonNullable: true });
  @Output() searchInput = new EventEmitter<string>();
  constructor() {
    this.subscribeToNameValueChanges();
  }

  private subscribeToNameValueChanges(): void {
    this.name.valueChanges
      .pipe(
        debounceTime(300),
        tap((value) => this.searchInput.emit(value)),
        takeUntilDestroyed()
      )
      .subscribe();
  }
}
