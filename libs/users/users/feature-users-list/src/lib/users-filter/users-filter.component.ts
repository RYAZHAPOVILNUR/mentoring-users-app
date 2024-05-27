import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent {
  private fb = inject(FormBuilder);
  private readonly facad = inject(UsersFacade);   
  form: FormGroup;
  filterName = { name: '' };

  constructor() {
    this.form = this.fb.group({
      name: [''],
    });
  }

  saveUserFilterName(): void {
    this.filterName = this.form.value
    this.facad.setUsersFilter(this.filterName)
  }
}