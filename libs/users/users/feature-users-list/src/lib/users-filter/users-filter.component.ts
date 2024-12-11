import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {UsersFacade} from '@users/users/data-access';

@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  imports:[FormsModule, ReactiveFormsModule],
  standalone:true,

})
export class UsersFilterComponent{
  public readonly form: FormGroup;
  private usersFacade: UsersFacade = inject(UsersFacade);
  constructor() {
    this.form = new FormGroup({
      filter: new FormControl('', [Validators.required]),
    });
    this.form.get('filter')?.valueChanges.subscribe(
      (value) => (this.usersFacade.updateFilterSelector(value))
    )
  }

  usersFilter(){
    return
  }
}
