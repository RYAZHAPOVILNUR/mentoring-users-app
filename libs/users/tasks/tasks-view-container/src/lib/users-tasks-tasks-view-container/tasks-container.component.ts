import { tasksAction } from './../../../../data-acces/src/lib/+state/tasks.action';
import {  Store } from '@ngrx/store';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksViewComponent } from '@users/users/tasks/tasks-view';

@Component({
  selector: 'users-tasks-container',
  standalone: true,
  imports: [CommonModule, TasksViewComponent],
  templateUrl: './tasks-container.component.html',
  styleUrls: ['./tasks-container.component.scss'],
})
export class TasksContainerComponent implements OnInit {
  private readonly store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(tasksAction.getColumn());
  console.log(tasksAction.getColumn())

  
  }
}
