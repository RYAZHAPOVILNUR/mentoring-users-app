import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { UsersFacade } from "@users/users/data-access";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'user-filter',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './user-filter.component.html',
    styleUrls: ['./user-filter.component.scss'],
    imports: [
        MatInputModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        ReactiveFormsModule,
        MatButtonModule
      ],
})

export class UserFilter {
    filterControl = new FormControl('');
    private readonly usersFacade = inject(UsersFacade)
    
    ngOnInit(): void {
        console.log('UserFilter component initialized'); // Добавьте эту строку
        this.filterControl.valueChanges
        .pipe(
            debounceTime(300),
            distinctUntilChanged()
        )
        .subscribe((filterValue) => {
            console.log('Filter value changed:', filterValue); // Логируем значение
            this.usersFacade.filterUsers(filterValue ?? '')
        })
    }
    
}