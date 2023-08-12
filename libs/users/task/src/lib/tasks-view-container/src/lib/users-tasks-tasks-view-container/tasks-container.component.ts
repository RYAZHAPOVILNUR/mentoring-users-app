import { selectColumn } from './../../../../data-acces/src/lib/+state/tasks.selector';
import { Observable } from 'rxjs';
import { tasksAction } from './../../../../data-acces/src/lib/+state/tasks.action';
import { Store } from '@ngrx/store';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksViewComponent } from '@users/users/tasks/tasks-view';
import { ITaskBoard } from 'libs/users/tasks/data-acces/src/lib/model/task.interface';


@Component({
  selector: 'users-tasks-container',
  standalone: true,
  imports: [CommonModule, TasksViewComponent],
  templateUrl: './tasks-container.component.html',
  styleUrls: ['./tasks-container.component.scss'],
})
export class TasksContainerComponent {
  private readonly store = inject(Store);

public readonly columns$ = this.store.select(selectColumn)

constructor() {
  this.store.dispatch(tasksAction.getTasksColumn());
}


  // public readonly columnName$ = this.store.select(selectTaskName)
  // public readonly columnTasks$ = this.store.select(selectTasks)

  // constructor() {
  //   this.store.dispatch(tasksAction.getTasksColumn());
  //   this.columnName$ = this.store.select(selectTaskName);
  //   this.columnTasks$ = this.store.select(selectTasks)
  //   console.log(this.columnName$)

      
  // }
}
