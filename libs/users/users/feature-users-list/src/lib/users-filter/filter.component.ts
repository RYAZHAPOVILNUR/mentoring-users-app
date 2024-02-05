import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  nameFilter = new FormControl<string>('');
  UsersFacade = inject(UsersFacade);

  filterUsers(){
    if(this.nameFilter.value?.length) {
      this.UsersFacade.setUsersFilter({name:this.nameFilter.value})
    }else {
      this.UsersFacade.setUsersFilter({name: ' '})
    }
  }
}
