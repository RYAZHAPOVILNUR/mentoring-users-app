import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: 'users-filter.component.html',
  styleUrls: ['users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent {
  private readonly destroyRef = inject(DestroyRef)
  @Output() filterUsers = new EventEmitter();
  name = new FormControl('', {nonNullable: true});

  constructor() {
    this.name.valueChanges
      .pipe(
        tap((value: string) => this.filterUsers.emit(value)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe()
  }
};




