import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'app-users-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-filters.component.html',
  styleUrls: ['./users-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent {
  private usersFacade = inject(UsersFacade);
  nameControl = new FormControl('');

 constructor() {
  this.nameControl.valueChanges
    .pipe(debounceTime(300), distinctUntilChanged())
    .subscribe((name) => {
      this.usersFacade.setUsersFilter({ name: name ?? '' });
    });
}

}
