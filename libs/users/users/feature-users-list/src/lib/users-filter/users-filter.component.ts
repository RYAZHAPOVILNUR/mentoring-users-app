import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersFilterComponent {
  private readonly usersFacade = inject(UsersFacade);
  private readonly formBuilder = inject(FormBuilder);
  public form!: FormGroup;

  constructor() {
    this.formInitialization();
  }

  private formInitialization(): void {
    this.form = this.formBuilder.group({
      filters: this.formBuilder.array([
        this.createFilterGroup('email')
      ])
    });
  }

  private createFilterGroup(filterType: string): FormGroup {
    return this.formBuilder.group({
      type: filterType,
      value: ['']
    });
  }

  public get filters() {
    return this.form.get('filters') as FormArray;
  }

  public onUsersFilter(): void {
    this.usersFacade.setUsersFilter(this.form.value.filters);
  }

  public addFilterField(): void {
    const lastFieldType = this.filters.at(this.filters.length - 1).get('type')?.value;
    const newFieldType = lastFieldType === 'email' ? 'name' : 'email';
    this.filters.push(this.formBuilder.group({
      type: [newFieldType],
      value: ['']
    }));
  }

  public removeFilterField(i: number): void {
    this.filters.removeAt(i);
  }

  public onClearFilters(): void {
    this.formInitialization();
    this.usersFacade.setUsersFilter([]);
  }

  public getAddFieldButtonLabel(): string {
    const lastFilter = this.filters.at(this.filters.length - 1).value;
    return lastFilter.type === 'email' ? 'Name' : 'Email';
  }

}
