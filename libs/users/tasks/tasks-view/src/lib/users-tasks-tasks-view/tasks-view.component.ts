import {Component} from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import {NgFor} from '@angular/common';

@Component({
  selector: 'users-tasks-view',
  standalone: true,
  imports: [CdkDrag, CdkDropList, NgFor],
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss'],
})
export class TasksViewComponent {BoardName = [
  'IDEAS',
  'RESEARCH',
  'TODO',
  'DONE',
];
tasks = [{
  id: 1,
  created_at: 'now',
  email: 'admin@admin',
  authorId: 0,
  borders: {
    boardName: 'IDEAS',
    tasks: [{
      taskName: 'task 1'
    }]
  }
},
{

}]

drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.BoardName, event.previousIndex, event.currentIndex);
}
drop1(event: CdkDragDrop<unknown>) {
  moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
}

}
