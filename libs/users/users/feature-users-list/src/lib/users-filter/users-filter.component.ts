import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, debounceTime, Subject, switchMap, takeUntil, tap, timer } from 'rxjs';
import { UsersFacade } from '@users/users/data-access';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AsyncPipe,
  ],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent {
  public usersFacade = inject(UsersFacade);

  public isLoading$ = new BehaviorSubject<boolean>(false);

  public readonly userNameInput = new FormControl('', {
    nonNullable: true,
  });

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.userNameInput.valueChanges
      .pipe(
        debounceTime(1000),
        tap(() => {
          this.isLoading$.next(true);
        }),
        switchMap((name: string) =>
          timer(500).pipe(
            tap(() => {
              this.usersFacade.usersFilterActivate(name);
              this.isLoading$.next(false);
            })
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
