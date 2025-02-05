import { Component, inject } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { UsersFacade } from "@users/users/data-access";

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class UsersFilterComponent {
  searchControl = new FormControl('');
  private usersFacade = inject(UsersFacade);

  constructor() {
    this.searchControl.valueChanges.subscribe(name => {
      this.usersFacade.setUsersFilter({ name: name || '' });
    });
  }
}