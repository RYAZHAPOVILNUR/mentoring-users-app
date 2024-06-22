import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent implements OnInit {
  private readonly usersFacade = inject(UsersFacade);
  private readonly fb = inject(FormBuilder);

  filterForm = this.fb.group({
    name: [''],
  });

  ngOnInit() {
    this.filterForm.valueChanges.subscribe((filterValue) => {
      this.usersFacade.filterUsers(filterValue.name as string);
    });
  }
}
