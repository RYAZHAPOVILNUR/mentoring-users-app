import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filteredUsers, setUsersFilter } from '@users/users/data-access';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime } from 'rxjs';


@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: 'users-filter.component.html',
  styleUrls: ['users-filter.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent implements OnInit {
  private builder = inject(FormBuilder);
  private store = inject(Store);

  filteredUsersForm = this.builder.group({
    filteredInput: this.builder.control(''),
  });

  ngOnInit(): void {
    this.filteredUsersForm.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      if(value?.filteredInput?.length) {
        this.store.dispatch(setUsersFilter({ filter: { name: value.filteredInput } }));
      } else {
        this.store.dispatch(setUsersFilter({ filter: { name: '' } }));
      }
    });
  }
}
