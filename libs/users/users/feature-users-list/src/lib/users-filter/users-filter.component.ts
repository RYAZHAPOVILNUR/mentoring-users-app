import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, filter, fromEvent } from 'rxjs';
import { Store } from '@ngrx/store';
import { setUsersFilter } from '@users/users/data-access';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent {
  store = inject(Store)

  onFilterChanged(event: Event) {
    const target = event.target as HTMLInputElement;

    fromEvent(target, 'input')
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {
        this.store.dispatch(setUsersFilter({ filter: { name: target.value.trim() } }))
      });
  }
}
