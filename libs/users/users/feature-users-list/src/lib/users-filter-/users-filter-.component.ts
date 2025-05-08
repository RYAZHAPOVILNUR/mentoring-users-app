import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'users-filter',
  templateUrl: './users-filter-.component.html',
  styleUrls: ['./users-filter-.component.css'], 
  imports: [], 
  standalone: true, 
})
export class UsersFilterComponent {
  nameControl = new FormControl<string>('', [Validators.required, Validators.minLength(2)]);
  
  @Output() changedInput = new EventEmitter<string>();  

  ngOnInit() {
    this.nameControl.valueChanges.subscribe((value: string | null) => {
      if (value) {
        this.changedInput.emit(value); 
      }
    }); 
  }
}
