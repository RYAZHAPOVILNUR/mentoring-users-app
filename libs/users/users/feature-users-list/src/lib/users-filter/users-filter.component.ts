import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';


@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent {

  private readonly userFacade = inject(UsersFacade)


  form = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  applyFilter() {
    this.userFacade.filterUsers({ name: this.form.value.name || '' })
    console.log(555);
  }

}
