import { MatButtonModule } from '@angular/material/button';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { IColumn, ITask } from '@users/users/task/data-access';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

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
  ],
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss'],
})
export class TasksViewComponent {
  @Input() columns!: IColumn[] | null;
  @Input() addColumn!: (columnName: IColumn) => void;
  @Input() addNewTask!: (columnIndex: number, taskName: string) => void;
  @Input() deleteColumn!: (columnIndex: number) => void;
  @Input() deleteTask!: (columnIndex: number, taskIndex: number) => void;
  @Input() drop!: (event: CdkDragDrop<ITask[]>, columnIndex: number) => void;

  public selectedColumnIndex: number | null = null;
  public task!: string;
  public columnName!: string;

  public addNewColumn() {
    if (this.columnName) {
      const newColumn: IColumn = {
        columnName: this.columnName,
        tasks: [],
      };
      this.addColumn(newColumn);
      this.columnName = '';
    }
  }

  splitText(text: string): string {
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
}
