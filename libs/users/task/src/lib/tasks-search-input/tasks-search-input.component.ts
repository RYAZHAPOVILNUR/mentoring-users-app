import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-tasks-search-input',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './tasks-search-input.component.html',
  styleUrls: ['./tasks-search-input.component.scss'],
})
export class TasksSearchInputComponent {
  public text = '';

  @Output() handleSearchText: EventEmitter<string> = new EventEmitter<string>();

  public searchTasks(text: string): void {
    this.text = text;
    this.handleSearchText.emit(this.text);
  }
}
