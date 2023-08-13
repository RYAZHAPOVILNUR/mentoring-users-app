import { IColumn, ITask, selectColumn, tasksAction } from '@users/users/task/data-access';
import { Store } from '@ngrx/store';
import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { TasksViewComponent } from '../tasks-view/tasks-view.component';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'users-tasks-container',
  standalone: true,
  imports: [CommonModule, TasksViewComponent, CdkDrag, CdkDropList, NgFor, CdkDropListGroup, FormsModule],
  templateUrl: './tasks-view-container.component.html',
  styleUrls: ['./tasks-view-container.component.scss'],
})
export class TasksContainerComponent {
  private readonly store = inject(Store);

public columns$ = this.store.select(selectColumn)
public columns: IColumn[] = [];
private subscription: Subscription;
public newColumn!: string;
public task!: string;
public toggle = false;

constructor() {
  this.store.dispatch(tasksAction.getTasksColumn());
  this.subscription = this.columns$.subscribe(columns => this.columns = columns);
  this.store.dispatch(tasksAction.postChangeColumns({ columns: this.columns }));

}

public addNewColumn(newColumnName: string){
  const newColumn: IColumn = {
    columnName: newColumnName,
    tasks: []
  };
  this.columns = [...this.columns, newColumn];
  this.store.dispatch(tasksAction.postChangeColumns({ columns: this.columns }));
  this.newColumn = '';
}


public addTaskColumn(task: string){
 
  console.log(task)
  this.newColumn = ''
}
public drop(event: CdkDragDrop<ITask[]>) {
  const prevIndex = event.previousIndex;
  const currentIndex = event.currentIndex;
  const previousContainer = event.previousContainer.data as ITask[];
  const currentContainer = event.container.data as ITask[];

  if (event.previousContainer === event.container) {
    moveItemInArray(previousContainer, prevIndex, currentIndex);
  } else {
    transferArrayItem(previousContainer, currentContainer, prevIndex, currentIndex);
  }

  this.store.dispatch(tasksAction.moveTask({ columns: this.columns }));
}

}












 // public readonly columnName$ = this.store.select(selectTaskName)
  // public readonly columnTasks$ = this.store.select(selectTasks)

  // constructor() {
  //   this.store.dispatch(tasksAction.getTasksColumn());
  //   this.columnName$ = this.store.select(selectTaskName);
  //   this.columnTasks$ = this.store.select(selectTasks)
  //   console.log(this.columnName$)

      
  // }