import { IColumn } from '@users/users/task/data-access';
import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { TasksViewComponent } from '../tasks-view/tasks-view.component';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TasksStore } from './tasks-list-container.store';
import { ThemeSwitchService } from '@users/users/core/ui/theme-switch';
import { PushPipe } from '@ngrx/component';
import {MatIconModule} from "@angular/material/icon";


@Component({
  selector: 'users-tasks-container',
  standalone: true,
  imports: [
    CommonModule,
    TasksViewComponent,
    NgFor,
    FormsModule,
    MatButtonModule,
    PushPipe,
    MatIconModule
  ],
  templateUrl: './tasks-view-container.component.html',
  styleUrls: ['./tasks-view-container.component.scss'],
  providers: [TasksStore],
})
export class TasksContainerComponent {
  private readonly tasksStore = inject(TasksStore);
  public readonly switchMode = inject(ThemeSwitchService);

  public colorMode$ = this.switchMode.isDarkTheme$;
  public columns$ = this.tasksStore.columns$;
  public filteredColumn$ = this.tasksStore.filteredColumn$

  public columns!: IColumn[];
  public text = '';

  public onUpdateColumns(event: { columns: IColumn[] }): void {
    this.tasksStore.updateLocalColumns(event.columns);
  }

  public deleteColumn(columnIndex: number) {
    this.tasksStore.deleteLocalColumn(columnIndex);
  }

  public addTask(event: { columnIndex: number; taskName: string }) {
    const { columnIndex, taskName } = event;
    this.tasksStore.addTaskToLocalColumn({ columnIndex, taskName });
  }

  public deleteTask(event: { columnIndex: number; taskName: string }) {
    this.tasksStore.deleteTask(event);
  }

  public searchTask(): void {
    this.tasksStore.searchTask(this.text);
  }
}
