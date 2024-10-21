import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent implements OnInit {
  form = new FormGroup({nameFilter: new FormControl('')});

  private readonly usersFacade = inject(UsersFacade);
  
  ngOnInit() {
    this.form.valueChanges.subscribe(v => { 
      const filterValue = v.nameFilter ?? ''; 
      this.usersFacade.filterUser(filterValue); 
      console.log(v); 
    });
  }
  


  // filter(){
  //   this.usersFacade.filterUser(this.form.value.nameFilter ?? '')
  // }


}
