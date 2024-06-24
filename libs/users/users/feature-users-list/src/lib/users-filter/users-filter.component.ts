import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersFacade } from '@users/users/data-access';

interface Filter {
  filter: {name: string}
}

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent {
  private readonly usersFacade = inject(UsersFacade)

  onInputChange(event: string) {
    const filter: Filter = {
      filter: { name: event }
    }

    this.usersFacade.onSubmitFilters(filter)
  }
}
