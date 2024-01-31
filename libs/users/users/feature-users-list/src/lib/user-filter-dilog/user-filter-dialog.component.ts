import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { UsersFacade } from '@users/users/data-access';
import { AVAILABLE_FILTERS } from '../util/constant';
import { Observable } from 'rxjs';
import { FiltersArray } from '@users/users/models/data-access/user-filter';

@Component({
  selector: 'users-user-filter-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './user-filter-dialog.component.html',
  styleUrls: ['./user-filter-dialog.component.scss']
})
export class UserFilterDialogComponent {
  private readonly usersFacade: UsersFacade = inject(UsersFacade);
  private readonly filters$: Observable<FiltersArray> = this.usersFacade.filters$;
  public availableFilters: string[] = AVAILABLE_FILTERS;
  public filterFormGroup: FormGroup = new FormGroup({
    filter: new FormControl('')
  });

  constructor() {
    this.filters$.subscribe(filtersFromStore => {
      const filtersArrayFromStore: string[] = filtersFromStore.map(({ field }) => field);

      this.availableFilters = filtersArrayFromStore
        .filter((field) =>
          !AVAILABLE_FILTERS.includes(field)
        ).concat(
          AVAILABLE_FILTERS.filter(
            field => !filtersArrayFromStore
              .includes(field)));
    });
  }
}
