import {Component} from "@angular/core";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {setUsersFilter} from "@users/users/data-access";
import { FormBuilder } from "@angular/forms";
import { Store } from "@ngrx/store";

@Component({
  selector: "users-filter",
  templateUrl: 'users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, NgIf, MatButtonModule, MatIconModule, ReactiveFormsModule]
})

export class UsersFilterComponent {
  filterForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.filterForm = this.fb.group({
      name: ['']
    });
  }
  applyFilter(): void {
    const nameFilter = this.filterForm.get('name')?.value;
    this.store.dispatch(setUsersFilter({ filter: { name: nameFilter } }));
  }
}
