import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-filter-ui',
  standalone: true,
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
})
export class UsersFilterComponent {
  public nameFilter = new FormControl('');

  private readonly usersFacade = inject(UsersFacade);

  onSubmit(event: Event) {
    event.preventDefault();
    this.usersFacade.setUsersFilter({ name: this.nameFilter.value as string });
  }
}
