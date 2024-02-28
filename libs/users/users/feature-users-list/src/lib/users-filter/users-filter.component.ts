import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
    selector: 'users-filter',
    standalone: true,
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule

    ],
    templateUrl: './users-filter.component.html',
    styleUrls: ['./users-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent {
    @Output()
    public filterUser = new EventEmitter<string>()
    public name = new FormControl('')

    public onSubmit(name: string | null) {
        let filterName = name as string
        this.filterUser.emit(filterName)
    }
}
