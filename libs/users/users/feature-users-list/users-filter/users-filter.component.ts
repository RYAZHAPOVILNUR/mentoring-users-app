import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [
    MatInputModule, 
    MatFormFieldModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent { 
  inputValue = new FormControl ('');
  private readonly destroy$ = new Subject<void>();
  
  constructor(private usersFacade: UsersFacade) {}

  ngOnInit() {
    this.inputValue.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(name => {
        this.usersFacade.setUsersFilter({ name: name || '' });
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}