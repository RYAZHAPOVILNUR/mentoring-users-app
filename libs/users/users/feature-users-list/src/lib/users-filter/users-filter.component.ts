import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-filter',
  standalone: true,
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class UsersFilterComponent {
  private readonly userFacade = inject(UsersFacade);
  public name = '';
  filterByName() {
    this.userFacade.filterUsers(this.name);
  }
}
