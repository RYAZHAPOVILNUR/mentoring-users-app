import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-users-filter',
  template: `
    <div>
      <label for="nameInput">Имя:</label>
      <input type="text" id="nameInput" [formControl]="nameControl" />
      <button (click)="applyFilter()">Применить</button>
    </div>
  `,
})
export class UsersFilterComponent {
  @Output() filterChanged = new EventEmitter<{ name: string }>();
  nameControl = new FormControl();

  applyFilter() {
    const name = this.nameControl.value;
    this.filterChanged.emit({ name });
  }
}
