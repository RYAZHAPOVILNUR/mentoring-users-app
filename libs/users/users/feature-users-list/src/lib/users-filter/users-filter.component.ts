import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { UsersFacade } from '@users/users/data-access';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { FilterField, FiltersArray, UserFilter } from '@users/users/models/data-access/user-filter';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserFilterDialogComponent } from '../user-filter-dilog/user-filter-dialog.component';
import { AVAILABLE_FILTERS } from '../util/constant';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss']
})
export class UsersFilterComponent {
  private readonly usersFacade: UsersFacade = inject(UsersFacade);
  public filters!: FormGroup;
  public readonly filtersFromStore$: Observable<FiltersArray> = this.usersFacade.filters$;
  public addFilter: MatDialog = inject(MatDialog);
  private readonly isAddBehavior$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public readonly isAddObservable$: Observable<boolean> = this.isAddBehavior$.pipe(
    map((isAdd: boolean): boolean => isAdd));
  public isDelete = true;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.filtersFromStore$.subscribe((fields: FiltersArray): void => {
      AVAILABLE_FILTERS.length === fields.length
        ? this.isAddBehavior$.next(false)
        : this.isAddBehavior$.next(true);

      this.isDelete = fields.length > 1;

      if (!fields) return;
      const formControls: any = {};

      fields.forEach((field: UserFilter): void => {
        formControls[field.field] = field.value;
      });

      this.filters = this.formBuilder.group<UserFilter>(formControls);
    });
  }

  acceptFilters(): void {
    const filters = Object.entries(this.filters.value);
    const filtersForStore: FiltersArray =
      filters.map(([field, value]): UserFilter => ({ value: value as string, field: field as FilterField }));

    this.usersFacade.setUsersFilters(filtersForStore);
  };

  resetFilter(): void {
    let emptyFilters: FiltersArray = [];
    this.filters.reset();

    this.filtersFromStore$.subscribe(filters => {
      emptyFilters = filters.map(({ field }) => ({ field, value: '' }));
    });

    this.usersFacade.setUsersFilters(emptyFilters);
  }

  openDialogAddFilter(): void {
    const dialogRef: MatDialogRef<UserFilterDialogComponent> = this.addFilter.open(UserFilterDialogComponent);

    dialogRef.afterClosed()
      .subscribe(({ filter }) => {
        if (!filter) return;
        let updatedFilters: FiltersArray = [];

        this.usersFacade.filters$.subscribe(filters => {
          updatedFilters = [...filters, { field: filter, value: '' }];
        });
        this.usersFacade.setUsersFilters(updatedFilters);
      });
  }

  deleteFilterField(filterName: string): void {
    let updatedFilters: FiltersArray = [];

    this.usersFacade.filters$.subscribe(filters => {
      updatedFilters = filters.filter(({ field }) => field !== filterName);
    });
    this.usersFacade.setUsersFilters(updatedFilters);
  }
}
