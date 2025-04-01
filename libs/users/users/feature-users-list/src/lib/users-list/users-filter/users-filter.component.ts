import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatIconModule]
})
export class UsersFilterComponent {
  nameControl = new FormControl('');

  constructor(private usersFacade: UsersFacade) {
    this.nameControl.valueChanges.subscribe((value) => {
      this.usersFacade.UsersFilter({ name: value || '' });
    });
  }
  }
  

