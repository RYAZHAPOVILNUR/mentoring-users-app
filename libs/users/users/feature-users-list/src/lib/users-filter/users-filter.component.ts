import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { UsersFacade } from '@users/users/data-access';


@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})

export class UsersFilterComponent {
  private readonly usersFacade = inject(UsersFacade);

  public filteredUsersForm: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  public filterByName(): void {
    this.usersFacade.filterUser(this.filteredUsersForm.value);
  }
}
