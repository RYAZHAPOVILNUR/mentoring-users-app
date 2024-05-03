import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Store } from '@ngrx/store';
import { setUsersFilter } from '@users/users/data-access';
import { MatIconModule } from '@angular/material/icon';
import {  MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss'],
})
export class UserFilterComponent {
  private store = inject(Store);
  inputForm: FormControl;
  input = document.getElementById('search') as HTMLElement

  constructor(){
    this.inputForm = new FormControl('');
  }

  onFilter(){
    this.store.dispatch(setUsersFilter({filter: {name: this.inputForm.value}}));
  }
}
