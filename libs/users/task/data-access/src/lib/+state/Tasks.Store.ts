import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { IColumn, ITask } from '../model/tasks.interface';
import { exhaustMap, tap } from 'rxjs';

export interface TasksComponentState {
  isLoading: boolean;
  columnName: string;
  tasks: ITask[];
}


@Injectable()
export class TasksStore extends ComponentStore<TasksComponentState> {
  private isLoading$ = this.select((state) => state.isLoading);
  private columnName$ = this.select((state) => state.columnName);
  private tasks$ = this.select((state) => state.tasks);

  public readonly vm$ = this.select({
    isLoading: this.isLoading$,
    columnName: this.columnName$,
    tasks: this.tasks$,
  });


  public setIsLoading = this.updater(state => ({...state, isLoading: true}));

  // getColumnTasks = this.effect((trigger$) =>{
  //   return trigger$.pipe(
  //     tap(() => {
  //       this.setIsLoading()
  //     }),
  //     exhaustMap(()=>{
  //       return 
  //     })
  //   )
  // })

  constructor() {
    super({
      isLoading: false,
      columnName: 'Todo',
      tasks: [{
        taskName: 'ngrx component state'
      }],
    });
  }
}
