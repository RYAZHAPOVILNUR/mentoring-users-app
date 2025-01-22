import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent {
  public usersFacade = inject(UsersFacade);
  public readonly filter = new FormGroup({
    name: new FormControl()
  })
  
  onFilter(): void {
    this.usersFacade.filter(this.filter.value.name);
  }
}
