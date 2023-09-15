import { IColumn } from '@users/users/task/data-access';
import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { TasksViewComponent } from '../tasks-view/tasks-view.component';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TasksStore } from './tasks-list-container.store';
import { PushPipe } from '@ngrx/component';

@Component({
  selector: 'users-tasks-container',
  standalone: true,
  imports: [
    CommonModule,
    TasksViewComponent,
    NgFor,
    FormsModule,
    MatButtonModule,
    PushPipe
  ],
  templateUrl: './tasks-view-container.component.html',
  styleUrls: ['./tasks-view-container.component.scss'],
  providers: [TasksStore],
})
export class TasksContainerComponent {
  constructor(private tasksStore: TasksStore) {}
  public columns$ = this.tasksStore.columns$;
  public columns!: IColumn[];

  public onUpdateColumns(event: { columns: IColumn[] }): void {
    this.tasksStore.updateLocalColumns(event.columns);
  }
  public deleteColumn(columnIndex: number) {
    this.tasksStore.deleteLocalColumn(columnIndex);
  }
  public addTask(event: { columnIndex: number; taskName: string }) {
    const { columnIndex, taskName } = event;
    this.tasksStore.addTaskToLocalColumn({ columnIndex, taskName });
  }
  public deleteTask(event: { columnIndex: number; taskName: string }) {
    this.tasksStore.deleteTask(event);
  }
}
