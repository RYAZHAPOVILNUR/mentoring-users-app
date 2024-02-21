import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent {
  nameFilter = new FormControl('');
  private usersFacade = inject(UsersFacade);

  applyFilter() {
    const name = this.nameFilter.value;
    if (name !== null) {
      this.usersFacade.filterUsers(name);
    }
  }
}
