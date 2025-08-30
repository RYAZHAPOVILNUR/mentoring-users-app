import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersFacade } from '@users/users/data-access-user';

@Component({
  selector: 'users-users-filter',
  imports: [CommonModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent {
  private readonly usersFacade = inject(UsersFacade);
  @Output() filterChange = new EventEmitter<string>();

  onUserFilterChange(name: string): void {
    this.filterChange.emit(name);
    this.usersFacade.setUsersFilter({ name });
  }
}
