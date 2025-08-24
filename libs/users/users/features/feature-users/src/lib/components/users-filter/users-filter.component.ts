import { Component } from "@angular/core";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
    selector: 'app-users-filter',
    templateUrl: './users-filter.component.html',
    styleUrl: './users-filter.component.scss',
    imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
    standalone: true,
})
export class UsersFilterComponent {
    public name = new FormControl('', Validators.required)
}