import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { UsersFacade } from "@users/users/data-access";

@Component({
    selector: 'users-filter',
    templateUrl: './users-filter.component.html',
    styleUrls: ['./users-filter.component.scss'],
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
})
export class UsersFilterComponent {
    readonly searchControl = new FormControl();
    private readonly usersFacade$ = inject(UsersFacade);

    form = new FormGroup({
        nameControl: new FormControl('', [Validators.required]),
    })

    applyFilter(): void {
        const name = this.form.get('nameControl')?.value?.trim() || '';
        this.usersFacade$.setUsersFilter({ name });
      }
}