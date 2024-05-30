import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent implements OnInit {
  public filterFormControl = new FormControl('');
  private readonly usersFacade = inject(UsersFacade);

  ngOnInit(): void {
      this.filterFormControl.valueChanges.subscribe((inputValue) => {
        this.usersFacade.filterUsers(inputValue as string);
      })
  }
}
