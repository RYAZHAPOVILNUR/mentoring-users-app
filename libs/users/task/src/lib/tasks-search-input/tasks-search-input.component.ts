import {Component, EventEmitter, Output} from "@angular/core";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'users-tasks-search-input',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
  ],
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
