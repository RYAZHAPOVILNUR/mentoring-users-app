import { IColumn, ITask } from '@users/users/task/data-access';
import { Component, inject, OnInit } from '@angular/core';
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
import { TasksStore } from './tasks-list-container.store';

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
  constructor(private tasksStore: TasksStore) {}
  public columns$ = this.tasksStore.columns$;
  public columns!: IColumn[];

  public onUpdateColumns(event: {columns: IColumn[]}): void {
    this.tasksStore.updateLocalColumns(event.columns);
  }
  public deleteColumn(columnIndex: number){
    this.tasksStore.deleteLocalColumn(columnIndex)
  }
  public addTask(event: {columnIndex: number, taskName: string}) {
    const { columnIndex, taskName } = event;
    this.tasksStore.addTaskToLocalColumn({ columnIndex, taskName });
  }
  public deleteTask(event: { columnIndex: number, taskName: string }) {
    this.tasksStore.deleteTask(event);
  }
  

  public dragDrop(event: CdkDragDrop<ITask[]>) {
    const prevIndex = event.previousIndex;
    const currentIndex = event.currentIndex;
    const previousContainer = event.previousContainer.data as ITask[];
    const currentContainer = event.container.data as ITask[];

    if (event.previousContainer === event.container) {
      moveItemInArray(previousContainer, prevIndex, currentIndex);
    } else {
      transferArrayItem(previousContainer, currentContainer, prevIndex, currentIndex);
    }
  }
}