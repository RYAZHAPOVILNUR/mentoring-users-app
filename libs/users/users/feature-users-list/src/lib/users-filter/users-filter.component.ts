import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UsersFilter } from '@users/users/data-access';

@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, NgIf, MatInputModule, MatButtonModule],
})
export class UsersFilterComponent {
  @Output() filterUsersWindow = new EventEmitter<UsersFilter>();
  public userFilterForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createFilterForm();
    this.setupFilterChanges();
  }

  private createFilterForm() {
    this.userFilterForm = this.fb.group({
      name: [''],
    });
  }

  public setupFilterChanges() {
    this.userFilterForm.get('name')?.valueChanges.subscribe((value: string) => {
      const filter: UsersFilter = { name: value };
      this.filterUsersWindow.emit(filter);
    });
  }
}
