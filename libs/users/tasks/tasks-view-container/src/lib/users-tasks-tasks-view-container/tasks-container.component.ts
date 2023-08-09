import { selectColumn } from './../../../../data-acces/src/lib/+state/tasks.selector';
import { Observable } from 'rxjs';
import { tasksAction } from './../../../../data-acces/src/lib/+state/tasks.action';
import {  Store } from '@ngrx/store';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksViewComponent } from '@users/users/tasks/tasks-view';
import { ITaskColum } from 'libs/users/tasks/data-acces/src/lib/model/task.interface';

@Component({
  selector: 'users-tasks-container',
  standalone: true,
  imports: [CommonModule, TasksViewComponent],
  templateUrl: './tasks-container.component.html',
  styleUrls: ['./tasks-container.component.scss'],
})
export class TasksContainerComponent implements OnInit {
  private readonly store = inject(Store);

  column$!: Observable<ITaskColum['column']>;
  columns: ITaskColum[] = []


  ngOnInit(): void {
    this.store.dispatch(tasksAction.getColumn());
    this.column$ = this.store.select(selectColumn);
    this.column$.subscribe(res => {
      console.log(res);
    });

  } 

  
}

