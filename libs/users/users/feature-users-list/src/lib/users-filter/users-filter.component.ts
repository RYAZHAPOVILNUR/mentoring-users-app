import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-filter',
  standalone: true,
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class UsersFilterComponent {
  private readonly userFacade = inject(UsersFacade);
  public filterName = new FormControl<string>('', { nonNullable: true });
  filterByName() {
    this.userFacade.filterUsers(this.filterName.value);
  }
}
