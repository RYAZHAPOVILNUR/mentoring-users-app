import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {}
