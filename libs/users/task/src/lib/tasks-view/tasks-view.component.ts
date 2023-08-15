import { MatButtonModule } from '@angular/material/button';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup} from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { IColumn, ITask } from '@users/users/task/data-access';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'users-tasks-view',
  standalone: true,
  imports: [CdkDrag, CdkDropList, NgFor, FormsModule, CdkDropListGroup, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss'],
})
export class TasksViewComponent {

  @Input({ required: true}) columns!: IColumn[] | null;
  @Input() drop!: (event: CdkDragDrop<ITask[]>) => void;
  @Input() addTaskColumn!: () => void; //Возможо нужно убрать, в случае если можно реалзиовывать отрисовку внутри родиительской комп.
  @Input() deleteColumn!: (columnIndex: number) => void;
}


