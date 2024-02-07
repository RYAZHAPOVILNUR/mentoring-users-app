import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  inject,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';
@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent {
  public nameFilter = new FormControl<string>('');
  private usersFacade = inject(UsersFacade);

  onUsersFilter() {
    if (this.nameFilter.value?.length) {
      this.usersFacade.setUsersFilter(this.nameFilter.value);
    } else {
      this.usersFacade.setUsersFilter('');
    }
  }
}
