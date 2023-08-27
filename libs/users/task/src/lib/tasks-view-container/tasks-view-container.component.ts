import { IColumn, ITask } from '@users/users/task/data-access';
import { Component, inject } from '@angular/core';
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
  private readonly tasksStore = inject(TasksStore);
  public columns$ = this.tasksStore.columns$;
  public columns!: IColumn[];
 

  onUpdateColumns(event: {columns: IColumn[]}): void {
    this.tasksStore.updateColumns(event.columns);
    console.log("onUpdateColumns called", event.columns);
  }

  public handleDeleteColumn(columnIndex: number) {
    this.tasksStore.deleteColumn(columnIndex);
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