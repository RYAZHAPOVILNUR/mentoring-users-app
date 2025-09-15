import { CdkDrag, CdkDragDrop, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Column, Task } from '@users/tasks/data-access-task';
import { BehaviorSubject, skip } from 'rxjs';

@Component({
  selector: 'users-tasks-column',
  standalone: true,
  imports: [
    CommonModule,
    CdkDrag,
    CdkDropList,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    DragDropModule,
  ],
  templateUrl: './tasks-column.component.html',
  styleUrls: ['./tasks-column.component.scss'],
})
export class TasksColumnComponent {
  private readonly editing$ = new BehaviorSubject(false);
  private columnData!: Column;
  public title!: string;
  public titleInitialValue!: string;
  @Output() deleteColumn = new EventEmitter<number>();

  @Output() deleteTask = new EventEmitter<{
    columnIndex: number;
    taskName: string;
  }>();

  @Output() dragDrop = new EventEmitter<CdkDragDrop<Column>>();

  @Output() addTask = new EventEmitter();
  @Output() removeTask = new EventEmitter();
  @Output() changeTaskModal = new EventEmitter();
  @Output() changeColumnName = new EventEmitter<string>();
  constructor() {
    this.editing$.pipe(skip(1), takeUntilDestroyed()).subscribe((editing) => {
      if (!editing && this.title !== this.titleInitialValue) {
        this.changeColumnName.emit(this.title);
      }
    });
  }
  @Input({ required: true })
  set column(column: Column) {
    this.title = column.columnName;
    if (!this.titleInitialValue) {
      this.titleInitialValue = this.title;
    }
    this.columnData = column;
  }
  get column() {
    return this.columnData;
  }

  @ViewChild('input', { read: ElementRef })
  set input(elRef: ElementRef<HTMLInputElement>) {
    if (elRef) {
      elRef.nativeElement.focus();
    }
  }

  set editing(value: boolean) {
    this.editing$.next(value);
  }
  get editing(): boolean {
    return this.editing$.value;
  }

  onDragDrop($event: CdkDragDrop<Column>) {
    this.dragDrop.emit($event);
  }

  public onAddNewTaskModal(): void {
    this.addTask.emit();
  }

  public onRemoveTask(taskData: string) {
    this.removeTask.emit(taskData);
  }
  public onChangeTaskModal(task: Task) {
    this.changeTaskModal.emit(task);
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

  public removeColumn() {
    this.deleteColumn.emit();
  }
  public onEditing() {
    this.editing = !this.editing;
  }
}
