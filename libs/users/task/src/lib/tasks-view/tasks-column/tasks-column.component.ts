import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-tasks-column',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks-column.component.html',
  styleUrls: ['./tasks-column.component.scss'],
})
export class TasksColumnComponent {}
