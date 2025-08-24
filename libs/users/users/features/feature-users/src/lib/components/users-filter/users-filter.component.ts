import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersFacade } from '@users/users/data-access-user';

@Component({
  selector: 'users-user-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent {
  private readonly usersFacade = inject(UsersFacade);
  private debounceTimer?: ReturnType<typeof setTimeout>;
  public searchInput = '';

  changeInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => this.search(value), 1000);
  }

  private search(name: string) {
    this.usersFacade.filterUsers({ name });
  }
}
