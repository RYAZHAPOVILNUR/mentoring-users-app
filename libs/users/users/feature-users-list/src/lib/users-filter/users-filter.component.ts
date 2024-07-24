import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent {
  @Output() filter = new EventEmitter<string | null>();
  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor() {
    this.form.valueChanges.subscribe((value) => {
      this.filter.emit(value.name);
    });
  }
}
