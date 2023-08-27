import { MatButtonModule } from '@angular/material/button';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { IColumn, ITask, ITaskBoard } from '@users/users/task/data-access';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';



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
  ],
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss'],
})
export class TasksViewComponent {
  @Input() columns!: IColumn[] | null;
  @Output() updateColumns = new EventEmitter<{ columns: IColumn[] }>();
  @Output() addNewTaskEvent = new EventEmitter<{ columnIndex: number, taskName: string }>();
  @Output() deleteColumnEvent = new EventEmitter<number>();
  @Output() deleteTaskEvent = new EventEmitter<{ columnIndex: number, taskIndex: number }>();
  @Input() dragDrop!: (event: CdkDragDrop<ITask[]>, columnIndex: number) => void;

  public selectedColumnIndex: number | null = null;
  public task!: string;
  public columnName!: string;
  public NewBoardName!: string;

  createNewBoard(): void{
    if (this.NewBoardName){
      const newBoard: ITaskBoard ={
        id: 1,
        created_at: 1,
        email: 'email',
        authorId: 1,
        columns: []
      }
      
    }
  }

  someUserActionThatChangesColumns(): void {
    if (this.columns && this.columnName) {
      const newColumns = [...this.columns];
      newColumns.push({
        columnName: this.columnName,
        tasks: [],
      });
      this.updateColumns.emit({columns: newColumns});
      console.log("Emitting updateColumns event", newColumns);
    }
  }
  
  // public addNewColumn() {
  //   if (this.columnName) {
  //     const newColumn: IColumn = {
  //       columnName: this.columnName,
  //       tasks: [],
  //     };
  //     this.addColumnEvent.emit(newColumn);
  //     this.columnName = '';
  //   }
  // }
  public deleteColumn(columnIndex: number) {
    this.deleteColumnEvent.emit(columnIndex);
  }

  public deleteTask(columnIndex: number, taskIndex: number) {
    this.deleteTaskEvent.emit({ columnIndex, taskIndex });
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
}

