import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { NgIf } from '@angular/common';
import { UsersFacade } from '@users/users/data-access';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [ NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule ],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.css']
})
export class UsersFilterComponent implements OnInit, OnDestroy {

  private readonly usersFacade = inject(UsersFacade);
  public formcontrolName = new FormControl<string>('', { nonNullable : true });

  ngOnInit(): void {
    this.formcontrolName.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500),
    ).subscribe(name => {
      this.usersFacade.setUsersFilter(name);
    });
  }

  ngOnDestroy(): void {
    this.usersFacade.resetUsersFilter();
  }
}
