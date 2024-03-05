import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {UsersFacade} from "@users/users/data-access";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validator, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {FilterField, UsersFilter} from "../../../../users-filters.model";


type FiltersControls = Record<string, Array<string | Validators> | string>

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './feature-users-filter.component.html',
  styleUrls: ['./feature-users-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureUsersFilterComponent implements OnInit{

  private readonly usersFacade= inject(UsersFacade)
  public filterFormGroup!: FormGroup;

  public controls: FiltersControls ={
    name: [''],
    email: ['']
  }

  public inputFieldsForUI = [...Object.entries(this.controls).map(el=> el[0])]

  private controlsToFiltersArray(controls: FiltersControls): UsersFilter[]{
    return Object.entries({...controls}).map(
        ([key, value]) => ({field: key, value: value[0]}) as UsersFilter
    )
  }

  constructor(
      private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.filterFormGroup = this.formBuilder.group({...this.controls})
    this.usersFacade.initUsersFilters(this.controlsToFiltersArray(this.controls))
  }

  updateUsersFilter(field: FilterField){
      this.usersFacade.updateUsersFilters(
          {field: field, value: this.filterFormGroup.controls[field].value}
      )
  }

}
