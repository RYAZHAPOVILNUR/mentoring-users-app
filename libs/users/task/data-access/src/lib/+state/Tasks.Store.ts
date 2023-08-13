import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ITask } from '../model/tasks.interface';

export interface TasksComponentState {
  isLoading: boolean;
  columnName: string;
  tasks: ITask[];
}

@Injectable()
export class TasksStore extends ComponentStore<TasksComponentState> {
  private isLoading$ = this.select((state) => state.isLoading);
  private columnName$ = this.select((state) => state.columnName);
  private tasks$ = this.select((state) => state.tasks);

  vm$ = this.select({
    isLoading: this.isLoading$,
    columnName: this.columnName$,
    tasks: this.tasks$,
  });

  constructor() {
    super({
      isLoading: false,
      columnName: 'Todo',
      tasks: [{
        taskName: 'ngrx component state'
      }],
    });
  }
}
