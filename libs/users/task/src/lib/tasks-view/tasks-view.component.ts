import { MatButtonModule } from '@angular/material/button';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup} from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ITask } from '@users/users/task/data-access';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { Column } from '../tasks-view-container/tasks-list-container.store';



@Component({
  selector: 'users-tasks-view',
  standalone: true,
  imports: [CdkDrag, CdkDropList, NgFor, FormsModule, CdkDropListGroup,MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss'],
})
export class TasksViewComponent {

  @Input({ required: true}) columns!: Column[] | null; 
  @Input({required: true}) vm!: any;
  @Input() drop!: (event: CdkDragDrop<ITask[]>) => void;
  @Input() tasks!: ITask[] 
  @Input() addTaskColumn!: () => void; //Возможо нужно убрать, в случае если можно реалзиовывать отрисовку внутри родиительской комп.
  @Input() deleteColumn!: (columnIndex: number) => void;
  @Input() delColumn!: (columnIndex: number) => void;
  @Input() deleteTask!: (columnIndex: number, taskIndex: number)=> void;
  @Input() addNewTask!: (columnIndex: number, taskName: string)=> void;
  @Input() addTask!: (args: { columnIndex: number; taskName: string }) => void;
}


