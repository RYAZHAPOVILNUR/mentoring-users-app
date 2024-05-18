import { Component, inject } from '@angular/core';
import { UsersFacade } from '@users/users/data-access';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent {
  private readonly userFacade = inject(UsersFacade);

  public formFilter = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  useFilter() {
    this.userFacade.filterUsers({ name: this.formFilter.value.name || '' })
  }
}
