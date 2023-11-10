import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-filter-ui',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class UsersFilterComponent {
  public readonly usersFacade = inject(UsersFacade);
  public readonly filterForm = new FormGroup({
    name: new FormControl(''),
  });

  onSubmitForm() {
    this.usersFacade.setUsersFilter({
      usersFilters: this.filterForm.value,
    });
  }
}
