import { Store } from '@ngrx/store';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksViewComponent } from '@users/users/tasks/tasks-view';

@Component({
  selector: 'users-tasks-container',
  standalone: true,
  imports: [CommonModule, TasksViewComponent],
  templateUrl: './tasks-container.component.html',
  styleUrls: ['./tasks-container.component.scss'],
})
export class TasksContainerComponent {
  private readonly store = inject(Store);
}
