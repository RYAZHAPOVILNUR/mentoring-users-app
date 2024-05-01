import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UsersFacade } from '@users/users/data-access';


@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule ],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent {
  private readonly usersFacade = inject(UsersFacade);
  private readonly fb = inject(FormBuilder);
  public readonly filterForm = this.fb.group({
    filter: ['']
  })

  applyFilter() {
    this.usersFacade.filterUsers({name: this.filterForm.value.filter || ''}) 
  }
}
