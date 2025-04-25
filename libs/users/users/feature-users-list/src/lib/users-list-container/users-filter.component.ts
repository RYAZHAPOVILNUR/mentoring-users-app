import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UsersFacade } from '@users/users/data-access';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule     
  ],
  template: `
    <mat-form-field appearance="outline" class="filter-field">
      <mat-label>Имя</mat-label>
      <input
        matInput
        [formControl]="nameControl"
        placeholder="Введите имя для фильтрации"
      >
    </mat-form-field>
  `,
  styles: [`
    .filter-field {
      width: 100%;
      margin-bottom: 16px;
    }
  `]
})
export class UsersFilterComponent {
  nameControl = new FormControl('');

  constructor(private usersFacade: UsersFacade) {
    this.nameControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(name => {
        this.usersFacade.setUsersFilter(name?.toLowerCase() || '');
      });
  }
}