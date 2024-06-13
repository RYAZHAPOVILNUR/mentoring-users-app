import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';


@Component({
  selector: 'users-filters',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  usersFacade = inject(UsersFacade);
  myForm: FormGroup ;
  private  fb = inject(FormBuilder);

  constructor() {
    this.myForm = this.fb.nonNullable.group({
      myInput: ['', Validators.required],
    })
  }
  filteredUsers(){
    const name = this.myForm.get('myInput')?.getRawValue() ?? ''; // Provide a
    this.usersFacade.setUsersFilter(name);
    console.log('filteredUsers occurs');
  }
}
