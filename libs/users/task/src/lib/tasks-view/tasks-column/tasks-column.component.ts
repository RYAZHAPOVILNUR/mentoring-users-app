import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPreview,
  CdkDropList,
  CdkDropListGroup,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IColumn } from '@users/users/task/data-access';
import {BehaviorSubject, skip} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'users-tasks-column',
  standalone: true,
  imports: [
    CommonModule,
    CdkDrag,
    CdkDropList,
    FormsModule,
    CdkDropListGroup,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    CdkDragPreview,
    DragDropModule,
  ],
  templateUrl: './tasks-column.component.html',
  styleUrls: ['./tasks-column.component.scss'],
})
export class TasksColumnComponent {
  @Input({ required: true })
  set column(column: IColumn) {
    this.title = column.columnName;
    if (!this.titleInitialValue) {
      this.titleInitialValue = this.title;
    }
    this.columnData = column;
  }
  get column() {
    return this.columnData;
  }
  @Output() deleteColumn = new EventEmitter<number>();
  @Output() deleteTask = new EventEmitter<{
    columnIndex: number;
    taskName: string;
  }>();
  @Output() dragDrop = new EventEmitter<CdkDragDrop<IColumn>>();
  @Output() addTask = new EventEmitter();
  @Output() removeTask = new EventEmitter();
  @Output() changeColumnName = new EventEmitter<string>()
  @ViewChild('input', { read: ElementRef })
  set input(elRef: ElementRef<HTMLInputElement>) {
    if (elRef) {
      elRef.nativeElement.focus();
    }
  }
  private readonly editing$ = new BehaviorSubject(false);
  set editing(value: boolean) {
    this.editing$.next(value);
  }
  get editing(): boolean {
    return this.editing$.value;
  }

  public title!: string;
  public titleInitialValue!: string;
  private columnData!: IColumn;

  constructor() {
    this.editing$
      .pipe(
        skip(1),
        takeUntilDestroyed()
      )
      .subscribe(editing => {
        if (!editing && this.title !== this.titleInitialValue) {
          this.changeColumnName.emit(this.title);
        };
      })
  }

  onDragDrop($event: CdkDragDrop<IColumn>) {
    this.dragDrop.emit($event);
  }

  public onAddNewTaskModal(): void {
    this.addTask.emit();
  }

  public onRemoveTask(taskData: any) {
    this.removeTask.emit(taskData);
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
