import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-filter',
  standalone: true,
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  imports: [MatFormFieldModule, MatInputModule],
})
export class UsersFilterComponent {
  constructor(private readonly usersFacade: UsersFacade) {}

  onUserFilterChange(name: string): void {
    this.usersFacade.setUsersFilter({ name });
  }
}
