import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule, FormsModule } from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
    selector: 'users-filter',
    standalone: true,
    templateUrl: 'users-filter.component.html',
    styleUrls: ['users-filter.component.scss'],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class UsersFilterComponent {
  userName = new FormControl('');
  @Input() filteredName?: string;
  @Output() inputChanged = new EventEmitter<string | null>();
  
  onFilter(): void {
    this.inputChanged.emit(this.userName.value);
  }
}