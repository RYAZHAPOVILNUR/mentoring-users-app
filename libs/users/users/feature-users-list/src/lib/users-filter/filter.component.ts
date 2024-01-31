import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsersFacade } from '../../../../data-access/src/lib/+state/users.facade';

@Component({
	selector: 'filter',
	templateUrl: './filter.component.html',
	standalone: true,
	imports: [ReactiveFormsModule],
})
export class FilterComponent {
	nameFilter = new FormControl<string>('');
	UsersFacade = inject(UsersFacade);

	filterUsers(){
		if(this.nameFilter.value?.length){
			this.UsersFacade.setUsersFilter({ name: this.nameFilter.value })
		}else{
			this.UsersFacade.setUsersFilter({ name: ' ' })
		}
	}
}