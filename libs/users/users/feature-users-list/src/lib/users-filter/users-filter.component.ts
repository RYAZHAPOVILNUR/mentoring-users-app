import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersFilterComponent {
  @Output() filterUser = new EventEmitter<string>();

  public form = new FormGroup({
    name: new FormControl(''),
  });

  onFilter() {
    const name = this.form.get('name')?.value || '';
    this.filterUser.emit(name);
  }  
}
