import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UsersFacade } from '@users/users/data-access';

@Component ({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class UsersFilterComponent {
 public form = new FormGroup({
   name:new FormControl(''),
 })

  constructor(private usersFacade: UsersFacade) {}
  ngOnInit(): void {
    this.form.get('name')?.valueChanges.subscribe((value: string | null) => {
      if (value !== null) {
        this.usersFacade.filterUsers(value); // ✅ Теперь передается строка, а не объект
      }
    });
  }
}
