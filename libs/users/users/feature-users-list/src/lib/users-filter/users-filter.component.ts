import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { UsersFacade, selectUsersFilter } from '@users/users/data-access';

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
export class UsersFilterComponent implements OnInit{
  private fb = inject(FormBuilder);
  private readonly facad = inject(UsersFacade);
  private readonly store = inject(Store); 
  form!: FormGroup;
  filterName = { name: '' };

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.filterName.name],
    });
    this.store.select(selectUsersFilter).subscribe(items => {
      this.filterName.name = items.name
    });
  }

  saveUserFilterName(): void {
    this.filterName = this.form.value
    this.facad.setUsersFilter(this.filterName)
  }
}