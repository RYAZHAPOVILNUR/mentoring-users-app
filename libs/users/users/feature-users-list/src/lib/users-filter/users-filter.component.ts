import { NgIf } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { UsersFacade } from "@users/users/data-access";

@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
})

export class UsersFilterComponent implements OnInit {
  inputFilter!: FormControl;
  private usersFacade = inject(UsersFacade);

  ngOnInit(): void {
    this.inputFilter = new FormControl('', [Validators.required, Validators.minLength(3)]);
  }

  sendInputValue(){
    const inpValue = this.inputFilter.value.trim();
    this.usersFacade.filterUsers(inpValue);
  };
}
