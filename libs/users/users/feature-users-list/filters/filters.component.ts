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

export class FiltersComponent implements OnInit {
  usersFacade: UsersFacade = inject(UsersFacade);
  myForm: FormGroup;
  private fb: FormBuilder = inject(FormBuilder);
  constructor() {
    this.myForm = this.fb.nonNullable.group({
      myInput: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.myForm.get('myInput')?.valueChanges.subscribe((value) => {
      this.filteredUsers(value);
    });
  }
  filteredUsers(name: string): void {
    this.usersFacade.setUsersFilter(name);
  }
}
