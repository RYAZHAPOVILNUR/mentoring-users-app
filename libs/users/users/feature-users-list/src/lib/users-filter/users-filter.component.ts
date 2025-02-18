import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { UsersFacade, usersFilterSelector } from '@users/users/data-access';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatDialogModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss']
})
export class UsersFilterComponent {
  store: Store = inject(Store)
  facade: UsersFacade = inject(UsersFacade)
  form!: FormGroup
  search: string = ''

  constructor() {
    this.store.select(usersFilterSelector).subscribe(({ name }) => this.search = name)

    this.form = new FormGroup({
      user: new FormControl(this.search, [])
    })

    this.form.get('user')?.valueChanges
      .pipe(
        debounceTime(300),
        map((value: string) => value.trim().toLowerCase()),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.facade.setUsersFilter(value)
      })

    this.form.get('user')?.valueChanges.subscribe(v => this.search = v)
  }

  clearSearch() {
    this.form.get('user')?.setValue('')
  }
}