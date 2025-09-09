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
  private readonly usersFacade = inject(UsersFacade);

  readonly userNameFormControl = new FormControl('', { nonNullable: true })

  constructor() {
    this.userNameFormControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((userName: string) => this.setUsersFilter({ userName }));
  }

  private setUsersFilter(filter: { userName: string }): void {
    this.usersFacade.setUsersFilter({ filter });
  }
}
