import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { UsersFacade } from '@users/users/data-access';
import { FIELD_FILTER } from '../util/constant';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.css']
})
export class UsersFilterComponent {
  private readonly usersFacade: UsersFacade = inject(UsersFacade);
  public filterByName: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.filterByName = this.formBuilder.group({
      name: ''
    });
  }

  acceptFilterByName(): void {
    this.usersFacade.filterUsersByName({
        value: this.filterByName.value[FIELD_FILTER],
        field: FIELD_FILTER
    });
  };

  resetFilter(): void {
    this.filterByName.reset();
    this.usersFacade.filterUsersByName( { value: '', field: FIELD_FILTER } );
  }
}
