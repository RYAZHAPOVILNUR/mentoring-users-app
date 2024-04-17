import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { UsersFacade } from "@users/users/data-access";

@Component({
    selector: 'users-filter',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
    ],
    templateUrl: './users-filter.component.html',
    styleUrls: ['./users-filter.component.scss'],
})

export class UsersFilterComponent {
    public readonly name = new FormControl()
    facade = inject(UsersFacade)

    filter(name: string): void {
        this.facade.setFilterUsers(name)
    }
}

