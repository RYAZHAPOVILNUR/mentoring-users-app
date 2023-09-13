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
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { IColumn } from '@users/users/task/data-access';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TasksStore } from '../tasks-view-container/tasks-list-container.store';

@Component({
  selector: 'users-tasks-view',
  standalone: true,
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
    
  ],
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss'],
})
export class TasksViewComponent {
  constructor(private tasksStore: TasksStore) {}

  @Input() columns!: IColumn[] | null;
  @Input() colorMode!: boolean | null;
  @Output() updateColumns = new EventEmitter<{ columns: IColumn[] }>();
  @Output() deleteColumn = new EventEmitter<number>();
  @Output() addTask = new EventEmitter<{columnIndex: number, taskName: string}>();
  @Output() deleteTask = new EventEmitter<{columnIndex: number, taskName: string}>();
  // @Output() dragDrop = new EventEmitter<CdkDragDrop<IColumn>>(); Если будет необходимо перенести dragDrop в smart компоненту или сервис
  

  public selectedColumnIndex: number | null = null;
  public task!: string;
  public columnName!: string;
  public NewBoardName!: string;

  someUserActionThatChangesColumns(): void {
    if (this.columns && this.columnName) {
      const newColumns = [...this.columns];
      newColumns.push({
        columnName: this.columnName,
        tasks: [],
      });
      this.updateColumns.emit({ columns: newColumns });
      this.columnName = '';
    }
  }

  public removeColumn(columnIndex: number) {
    this.deleteColumn.emit(columnIndex);
  }

  public addNewTask(columnIndex: number, taskName: string) {
    this.addTask.emit({ columnIndex, taskName });
    this.task = '';
  }
  public removeTask(columnIndex: number, taskName: string) {
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
}
