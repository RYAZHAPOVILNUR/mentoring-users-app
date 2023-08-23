import {
  IColumn,
  ITask,
  selectColumn,
  tasksAction,
} from '@users/users/task/data-access';
import { Store } from '@ngrx/store';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { TasksViewComponent } from '../tasks-view/tasks-view.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Column, TasksStore } from './tasks-list-container.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'users-tasks-container',
  standalone: true,
  imports: [
    CommonModule,
    TasksViewComponent,
    CdkDrag,
    CdkDropList,
    NgFor,
    CdkDropListGroup,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './tasks-view-container.component.html',
  styleUrls: ['./tasks-view-container.component.scss'],
  providers: [TasksStore],
})
export class TasksContainerComponent {
  private tasksStore = inject(TasksStore);
  public vm$ = this.tasksStore.vm$;
  public errorName = false;
  public columns: IColumn[] = [];
  public columns$ = this.tasksStore.columns$;
  public newColumnName!: string;
  public task!: string;
  public toggle = false;
  public readonly delColumn = this.tasksStore.removeColumn;
  public readonly addTask = this.tasksStore.addTask;
  public readonly removeTask = this.tasksStore.removeTask;

  constructor() {
    // this.store.dispatch(tasksAction.getTasksColumn());
    // this.subscription = this.columns$.subscribe(columns => this.columns = columns);
  }

    public addNewColumn(newColumnName: string) {
      if (newColumnName) {
        const newColumn: Column = {
          columnName: newColumnName,
          tasks: [],
        };
        this.tasksStore.addColumn(newColumn.columnName);
        this.errorName = false;
        this.newColumnName = '';
      } else {
        this.errorName = true;
      }
    }
  
    public deleteColumn(columnIndex: number) {
      this.delColumn(columnIndex);
    }
    public addNewTask(columnIndex: number, taskName: string) {
      this.addTask({ columnIndex, taskName });
    }
    
    public deleteTask(columnIndex: number, taskIndex: number) {
      this.removeTask({ columnIndex, taskIndex });
    }
    public drop(event: CdkDragDrop<ITask[]>) {
      const prevIndex = event.previousIndex;
      const currentIndex = event.currentIndex;
      const previousContainer = event.previousContainer.data as ITask[];
      const currentContainer = event.container.data as ITask[];
  
      if (event.previousContainer === event.container) {
        moveItemInArray(previousContainer, prevIndex, currentIndex);
      } else {
        transferArrayItem(
          previousContainer,
          currentContainer,
          prevIndex,
          currentIndex
        );
      }
    }
}
