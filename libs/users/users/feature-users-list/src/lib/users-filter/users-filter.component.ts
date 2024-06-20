import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent implements OnInit {
  private readonly usersFacad = inject(UsersFacade)
  public readonly searchUser = new FormControl('')
 
  ngOnInit() {
    this.searchUser.valueChanges.subscribe(value => {
      if(value !== null){
        this.usersFacad.filterUsers(value)
      }
    })
  }

  clearInput() {
    this.searchUser.setValue('')
  }
}

