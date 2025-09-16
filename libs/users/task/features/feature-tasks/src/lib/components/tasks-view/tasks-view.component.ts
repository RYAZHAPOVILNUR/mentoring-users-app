import {
  CdkDragDrop,
  CdkDropListGroup,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule, NgFor } from '@angular/common';
import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { filter } from 'rxjs';

import { Column, Task } from '@users/tasks/data-access-task';

import { TasksColumnComponent } from './tasks-column/tasks-column.component';
import { TaskChangeDialogComponent } from '../../modals/task-change-dialog/task-change-dialog.component';
import { TasksCreateColumnDialogComponent } from '../../modals/tasks-create-column-dialog/tasks-create-column-dialog.component';
import { TasksCreateDialogComponent } from '../../modals/tasks-create-dialog/tasks-create-dialog.component';
import { TasksStore } from '../../pages/tasks-view-container/tasks-list-container.store';

@Component({
  selector: 'users-tasks-view',
  standalone: true,
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss'],
  imports: [
    NgFor,
    FormsModule,
    CdkDropListGroup,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    DragDropModule,
    TasksColumnComponent,
  ],
})
export class TasksViewComponent {
  @Input() columns?: Column[];
  @Input() colorMode?: boolean;
  private readonly destroyRef = inject(DestroyRef);
  private matDialog = inject(MatDialog);

  @Output() updateColumns = new EventEmitter<{ columns: Column[] }>();
  @Output() deleteColumn = new EventEmitter<number>();
  @Output() addTask = new EventEmitter<{
    columnIndex: number;
    taskName: string;
  }>();
  @Output() deleteTask = new EventEmitter<{
    columnIndex: number;
    taskName: string;
  }>();
  @Output() changeColumnName = new EventEmitter<{
    columnIndex: number;
    columnName: string;
  }>();
  constructor(private tasksStore: TasksStore) {}

  public removeColumn(columnIndex: number) {
    this.deleteColumn.emit(columnIndex);
  }
  public removeTask(taskName: string, columnIndex: number) {
    this.deleteTask.emit({ columnIndex, taskName });
  }
  public dragDrop(event: CdkDragDrop<Column>): void {
    const prevIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    const previousColumnName = event.previousContainer.data?.columnName;
    const currentColumnName = event.container.data?.columnName;

    const updatedColumns = JSON.parse(JSON.stringify(this.columns));

    const previousColumn = updatedColumns.find((column: Column) => column.columnName === previousColumnName);
    const currentColumn = updatedColumns.find((column: Column) => column.columnName === currentColumnName);

    if (event.previousContainer === event.container) {
      moveItemInArray(previousColumn.tasks, prevIndex, currentIndex);
    } else {
      transferArrayItem(previousColumn.tasks, currentColumn.tasks, prevIndex, currentIndex);
    }
    this.tasksStore.updateLocalColumns(updatedColumns);
  }
  public openAddNewTaskModal(columnIndex: number): void {
    const dialogRef: MatDialogRef<TasksCreateDialogComponent> = this.matDialog.open(TasksCreateDialogComponent, {});
    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((taskName) => !!taskName),
      )
      .subscribe((taskName: string) => this.addTask.emit({ columnIndex, taskName }));
  }
  public openChangeTaskModal(task: Task): void {
    const dialogRef: MatDialogRef<TaskChangeDialogComponent> = this.matDialog.open(TaskChangeDialogComponent, {
      width: '1040px',
      data: { title: task.taskName },
    });
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
  public openAddNewColumnModal(): void {
    const dialogRef: MatDialogRef<TasksCreateColumnDialogComponent> = this.matDialog.open(
      TasksCreateColumnDialogComponent,
      {},
    );
    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((column) => !!column),
      )
      .subscribe((columnName) => this.addNewColumn(columnName));
  }
  public onChangeColumnName(event: string, columnIndex: number): void {
    this.changeColumnName.emit({ columnName: event, columnIndex });
  }
  private addNewColumn(columnName: string): void {
    if (this.columns) {
      const newColumns = [...this.columns];
      newColumns.push({
        columnName: columnName,
        tasks: [],
      });
      this.updateColumns.emit({ columns: newColumns });
    }
  }
}
