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
  public userFilterForm!: FormGroup;
  @Output() filterUsersWidow = new EventEmitter<string>();

  constructor(public fb: FormBuilder) {
    this.createFilterForm();
    this.setupFilterChanges();
  }

  private createFilterForm() {
    this.userFilterForm = this.fb.group({
      name: [''],
    });
  }

  public setupFilterChanges() {
    this.userFilterForm.get('name')?.valueChanges.subscribe((value) => {
      if (value === '') {
        this.filterUsersWidow.emit('');
      } else {
        this.filterUsersWidow.emit(value);
      }
    });
  }
}


