import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class UsersFilterComponent {
  filterForm = new FormGroup({
    name: new FormControl(''),
  });

  @Output() filterUsers = new EventEmitter();
  name = 'Clear me';

  onFilter(): void {
    this.filterUsers.emit(this.filterForm.value);
  }

  clearFilter() {
    this.filterForm.get('name')?.setValue('');
    this.onFilter();
  }
  
}