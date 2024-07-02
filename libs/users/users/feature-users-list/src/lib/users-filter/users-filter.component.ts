import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'users-filter',
  standalone: true,
  templateUrl: './users-filter.component.html',
  imports: [ReactiveFormsModule]
  // styleUrls: ['./users-list-container.component.scss'],
})

export class UsersFilterComponent implements OnInit {
  constructor() {
    this.filterInput = new FormGroup({
      name: new FormControl(""),
    });

  }
  filterInput: FormGroup;

  @Output() filterUsers = new EventEmitter();

  onFilterUsers(searchQuery: string) {
    this.filterUsers.emit(searchQuery);
  }

  ngOnInit() {
    this.filterInput.valueChanges.subscribe(change => {
      this.onFilterUsers(change);
    });
  }
}