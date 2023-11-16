import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import {CommonModule} from "@angular/common";
import {setUsersFilter} from "@users/users/data-access";

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: 'users-filter.component.html',
  styleUrls: ['./users-filter.component.scss']
})

export class UsersFilterComponent {
  filterForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.filterForm = this.fb.group({
      name: ['']
    });
  }
  applyFilter(): void {
    const nameFilter = this.filterForm.get('name')?.value;
    this.store.dispatch(setUsersFilter({ filter: { name: nameFilter } }));
  }
}
