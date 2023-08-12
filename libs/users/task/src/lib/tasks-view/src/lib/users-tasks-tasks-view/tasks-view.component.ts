import { Board } from '../../../../data-acces/src/lib/model/board.model';
import { Task } from '../../../../data-acces/src/lib/model/task.model';
import { MatButtonModule } from '@angular/material/button';
import { Column } from '../../../../data-acces/src/lib/model/column.model';


import {Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList, CdkDropListGroup} from '@angular/cdk/drag-drop';
import {NgFor} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';





@Component({
  selector: 'users-tasks-view',
  standalone: true,
  imports: [CdkDrag, CdkDropList, NgFor, FormsModule, CdkDropListGroup, MatButtonModule, CommonModule],
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss'],
})
export class TasksViewComponent {
  testBoardId = 1
  newBoard = '';
  newTask!: Task[];
  showTask = false;
  selectedItem!: Task | string;
  CreateNewTask = ''

  board: Board = new Board( 1, 'myBoard', [
    new Column(1, 'Idea', [
      new Task([new Date()], 'Make some Task' )
    ]),
    new Column(2, 'Todo', [
      new Task([new Date()], 'Make some Task2' )
    ]),
    new Column(3, 'In Progress', [
      new Task([new Date()],'Make some Task3' )
    ]),
    new Column(4, 'Done', [
      new Task([new Date()], 'Make some Task4' )
    ]),
    
    
  ]);


    drop(event: CdkDragDrop<Task[], Task[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
}

addBoard() {
  if (this.newBoard) {
    const newColumn = new Column(this.testBoardId, this.newBoard, this.newTask);
    this.board.columns.push(newColumn);
    this.newBoard = ''; 
}
}
// addTask(){
//   if (this.newTask){
//     const newTask = new Task([new Date()], this.CreateNewTask );
//     this.column.tasks.push(newTask)
//     this.CreateNewTask = '';
//   }
// }
showTaskDetails(item: Task | string) {
  this.showTask = !this.showTask;
  this.selectedItem = item;
}
}