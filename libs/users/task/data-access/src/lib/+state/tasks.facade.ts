import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { tasksAction } from './tasks.action';
import { IColumn } from '../model/tasks.interface';
import { selectColumns } from './tasks.selector';

@Injectable({
  providedIn: 'root',
})
export class TasksFacade {  
    private readonly store = inject(Store)
    public allTaskColumns$ = this.store.select(selectColumns);
   
  getTasksColumn() {
    this.store.dispatch(tasksAction.getTasksColumn());
  }

  addColumn(columnName: IColumn) {
    this.store.dispatch(tasksAction.addColumn({ columnName }));
  }

  deleteColumn(columnIndex: number) {
    this.store.dispatch(tasksAction.deleteColumn({ columnIndex }));
  }

  addTask(columnIndex: number, taskName: string) {
    this.store.dispatch(tasksAction.addTask({ columnIndex, taskName }));
  }

  deleteTask(columnIndex: number, taskIndex: number) {
    this.store.dispatch(tasksAction.deleteTask({ columnIndex, taskIndex }));
  }
  moveTask(previousColumnIndex: number, currentColumnIndex: number, prevTaskIndex: number, currentTaskIndex: number) {
    this.store.dispatch( tasksAction.moveTask({ previousColumnIndex, currentColumnIndex, prevTaskIndex, currentTaskIndex,})
    );
  }
}
