import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
})
export class UsersFilterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  filterForm = this.fb.group({ name: '' });

  ngOnInit() {
    this.filterForm.get('name')?.valueChanges.subscribe((value) => console.log(value));
  }
}
