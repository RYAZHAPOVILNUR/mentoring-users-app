import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, NgIf, MatInputModule, MatButtonModule],
})
export class UsersFilterComponent {
  userFilterForm!: FormGroup;

  constructor(public fb: FormBuilder) {
    this.createFilterForm();
  }

  private createFilterForm() {
    this.userFilterForm = this.fb.group({
      name: [''],
    });
  }

  @Output() filterUsersWidow = new EventEmitter<string>();

  public onFilterUsers(event: Event) {
    event.preventDefault();
    const filterValue = this.userFilterForm.value.name;
    this.filterUsersWidow.emit(filterValue);
  }
}


