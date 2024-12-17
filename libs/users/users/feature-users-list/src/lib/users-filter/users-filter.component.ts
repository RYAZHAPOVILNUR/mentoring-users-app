import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, debounceTime, map, startWith, switchMap, tap, timer } from 'rxjs';
import { UsersFacade } from '@users/users/data-access';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'users-users-filter',
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

  ngOnInit(): void {
    this.userNameInput.valueChanges
      .pipe(
        debounceTime(1000),
        tap(() => {
          if (this.userNameInput.dirty || this.userNameInput.touched) {
            this.isLoading$.next(true);
            console.log('tap1');
          }
        }),
        switchMap((name: string) =>
          timer(500).pipe(
            tap(() => {
              console.log('tap2');
              this.usersFacade.usersFilterActivate(name);
              this.isLoading$.next(false);
            })
          )
        ),
        startWith('')
      )
      .subscribe();
  }
}
