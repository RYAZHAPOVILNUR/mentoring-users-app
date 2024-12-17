import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';
import { debounceTime } from 'rxjs';



@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatInputModule, ReactiveFormsModule, FormsModule],
  providers: [],
})
export class UsersFilterComponent implements OnInit {
  filterUser = new FormControl('');
  userFacade = inject(UsersFacade)

  ngOnInit(): void {
    this.filterUser.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      if(value !== null){
        this.userFacade.filteredUser(value)
      }
    });
  }
}
