<<<<<<< HEAD
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
=======
import { ChangeDetectionStrategy, Component, EventEmitter, Output, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
>>>>>>> b5eb36a0bc5b8437c99a21b3a9fb457e97d1fbc0

@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
<<<<<<< HEAD
  imports: [ReactiveFormsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent implements OnDestroy {
  @Output() filter = new EventEmitter();
  private readonly fb = inject(FormBuilder);
  private readonly destroy$ = new Subject<void>();

  public readonly filterUsers = this.fb.control('', [Validators.required]);

  constructor() {
    this.filterUsers.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value !== null) this.filter.emit(value);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
=======
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly destroy$ = new Subject<void>();
  public readonly filterUsers = this.fb.control('', [Validators.required]);

  @Output() filterChanged = new EventEmitter<string>();

  ngOnInit(): void {
    this.filterUsers.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value !== null) {
          this.filterChanged.emit(value);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
>>>>>>> b5eb36a0bc5b8437c99a21b3a9fb457e97d1fbc0
