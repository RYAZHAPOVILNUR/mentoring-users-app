import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setUsersFilter } from '@users/users/data-access';
import { Subject, debounceTime, distinctUntilChanged, fromEvent, map, takeUntil, tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  imports: [FormsModule, ReactiveFormsModule],
})
export class UsersFilterComponent implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  public myForm!: FormGroup;
  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  filter() {
    this.store.dispatch(setUsersFilter({ filter: { name: this.myForm.get('name')?.value } }));
  }
}
