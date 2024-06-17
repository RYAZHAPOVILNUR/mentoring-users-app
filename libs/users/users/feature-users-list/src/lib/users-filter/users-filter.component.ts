import { Component, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { UsersFacade } from '@users/users/data-access';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

 interface Filter {
   filter: {
     name: string;
   }
 }

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})

export class UsersFilterComponent {
  private readonly usersFacade = inject(UsersFacade);

  onInputChange(event: string) {
    const filter: Filter={
      filter: {
        name: event
      }
    }
    this.usersFacade.filteredUsers(filter)
  }

}

