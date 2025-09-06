import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { UsersFacade } from "@users/users/data-access-user";
import { MatInputModule } from "@angular/material/input";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "users-users-form",
  standalone: true,
  templateUrl: "./users-filter.component.html",
  styleUrl: "./users-filter.component.scss",
  imports: [ReactiveFormsModule, MatInputModule],
})
export class UsersFormComponent {
  usersFacade = inject(UsersFacade);

  filterForm = new FormGroup({
    'userName': new FormControl('', { nonNullable: true }),
  });

  constructor() {
    this.filterForm.controls.userName.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      )
      .subscribe((inputValue: string) => {
        this.setUsersFilter(inputValue)
      });
  }

  setUsersFilter(username: string) {
    this.usersFacade.setUsersFilter({ filter: { name: username } });
  }
}
