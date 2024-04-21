import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent {
  private readonly usersFacade = inject(UsersFacade);
  usersFilterForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.usersFilterForm = this.formBuilder.group({
      inputValue: [''], // Установите начальное значение здесь
    });

    this.usersFilterForm?.get('inputValue')?.valueChanges.subscribe((value: any) => {
      console.log(value);
      this.usersFacade.filterUsers({ name: value });
    });
  }
  getValue(event: Event) {
    console.log('setNewUserName', (event.target as HTMLTextAreaElement).value);
  }
}
