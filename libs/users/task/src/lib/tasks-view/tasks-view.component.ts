import { MatButtonModule } from '@angular/material/button';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPreview,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
  DragDropModule
} from '@angular/cdk/drag-drop';
import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { IColumn, ITask } from '@users/users/task/data-access';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TasksStore } from '../tasks-view-container/tasks-list-container.store';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { TasksCreateDialogComponent } from "../tasks-create-dialog/tasks-create-dialog.component";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { filter } from "rxjs";
import { TasksCreateColumnDialogComponent } from "../tasks-create-column-dialog/tasks-create-column-dialog.component";
import { TasksColumnComponent } from "./tasks-column/tasks-column.component";
import { TaskChangeDialogComponent } from '../task-change-dialog/task-change-dialog.component';


@Component({
  selector: 'users-tasks-view',
  standalone: true,
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss'],
  imports: [
    CdkDrag,
    CdkDropList,
    NgFor,
    FormsModule,
    CdkDropListGroup,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    CdkDragPreview,
    DragDropModule,
    TasksColumnComponent
  ]
})

export class TasksViewComponent {

  private matDialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef)

  constructor(private tasksStore: TasksStore) {
  }


  @Input() columns?: IColumn[];
  @Input() colorMode?: boolean;
  @Output() updateColumns = new EventEmitter<{ columns: IColumn[] }>();
  @Output() deleteColumn = new EventEmitter<number>();
  @Output() addTask = new EventEmitter<{ columnIndex: number, taskName: string }>();
  @Output() deleteTask = new EventEmitter<{ columnIndex: number, taskName: string }>();
  @Output() changer = new EventEmitter<{ task: any }>();
  @Output() changeColumnName = new EventEmitter<{ columnIndex: number, columnName: string }>();


  public removeColumn(columnIndex: number) {
    this.deleteColumn.emit(columnIndex);
  }

  public removeTask(taskName: string, columnIndex: number,) {
    this.deleteTask.emit({ columnIndex, taskName });
  }

  public splitText(text: string): string {
    let result = '';
    let line = '';

    text.split(' ').forEach((word) => {
      if (line.length + word.length <= 30) {
        line += (line ? ' ' : '') + word;
      } else {
        result += (result ? '<br>' : '') + line;
        line = word;
      }
    });
    return result + (line ? '<br>' + line : '');
  }

  public dragDrop(event: CdkDragDrop<IColumn>): void {
    const prevIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    const previousColumnName = event.previousContainer.data?.columnName;
    const currentColumnName = event.container.data?.columnName;

    const updatedColumns = JSON.parse(JSON.stringify(this.columns));

    const previousColumn = updatedColumns.find(
      (column: IColumn) => column.columnName === previousColumnName
    );
    const currentColumn = updatedColumns.find(
      (column: IColumn) => column.columnName === currentColumnName
    );

    if (event.previousContainer === event.container) {
      moveItemInArray(previousColumn.tasks, prevIndex, currentIndex);
    } else {
      transferArrayItem(
        previousColumn.tasks,
        currentColumn.tasks,
        prevIndex,
        currentIndex
      );
    }
    this.tasksStore.updateLocalColumns(updatedColumns);
  }

  public openAddNewTaskModal(columnIndex: number): void {
    const dialogRef: MatDialogRef<TasksCreateDialogComponent> = this.matDialog.open(TasksCreateDialogComponent, {});
    dialogRef.afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(taskName => !!taskName)
      )
      .subscribe((taskName: string) => this.addTask.emit({ columnIndex, taskName }))
  }

  public openChangeTaskModal(task: ITask): void {

    const dialogRef: MatDialogRef<TaskChangeDialogComponent> = this.matDialog.open(TaskChangeDialogComponent, {
      width: '1040px',
      data: { title: task.taskName }
    });
    dialogRef.afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe()
  }

  public openAddNewColumnModal(): void {
    const dialogRef: MatDialogRef<TasksCreateColumnDialogComponent> = this.matDialog.open(TasksCreateColumnDialogComponent, {});
    dialogRef.afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(column => !!column)
      )
      .subscribe((columnName => this.addNewColumn(columnName)))
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

  public onChangeColumnName(event: string, columnIndex: number): void {
    this.changeColumnName.emit({ columnName: event, columnIndex });
  }
}

