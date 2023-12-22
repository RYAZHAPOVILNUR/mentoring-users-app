import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'users-filter',
  template: `
    <form>
      <label for="name">Имя:</label>
      <input type="text" id="name" [formControl]="nameControl" />
      <button type="button" (click)="applyFilter()">Применить</button>
    </form>`,
  styles: [],
  imports: [
    ReactiveFormsModule
  ],
  standalone: true
})
export class UsersFilterComponent {
  nameControl = new FormControl();

  @Output() filterAppLied = new EventEmitter<string>();

  applyFilter(){
    const nameFilter = this.nameControl.value;
    this.filterAppLied.emit(nameFilter)
  }
}
