import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { ApiService } from '@users/core/http';
import {
  IColumn,
  ITask,
  ITaskBoard,
  tasksAction,
} from '@users/users/task/data-access';
import { map, tap } from 'rxjs';

export interface Column {
  columnName: string;
  tasks: ITask[];
}

export interface TasksComponentState {
  isLoading: boolean;
  columns: Column[];
}

const initialState: TasksComponentState = {
  isLoading: false,
  columns: [],
};

@Injectable()
export class TasksStore extends ComponentStore<TasksComponentState> {
  private readonly store = inject(Store);
  private readonly apiService = inject(ApiService);

  public isLoading$ = this.select((state) => state.isLoading);
  public columns$ = this.select(({columns})=> columns);
  public tasks$ = this.select((state) =>
    state.columns.flatMap((column: Column) =>
      column.tasks.map((task) => task.taskName)
    )
  );

  public readonly vm$ = this.select({
    isLoading: this.isLoading$,
    columns: this.columns$,
    tasks: this.tasks$,
  });

  constructor() {
    super(initialState);
  }
  
  private readonly getColumnSuccess = this.updater(
    (state, action: ITaskBoard) => ({
      ...state,
      columns: action.columns,
    })
  );

  readonly getColumnTasks = this.effect(() =>
    this.apiService
      .get<ITaskBoard>('/todos/me')
      .pipe(tap((res) => this.getColumnSuccess(res)))
  );

  readonly addColumn = this.updater((state, column: Column) => ({
    ...state,
    columns: [...state.columns, column],
  }));
  
  readonly removeColumn = this.updater((state, columnName: string) => ({
    ...state,
    columns: state.columns.filter((column) => column.columnName !== columnName),
  }));
}


// {
//   columnName: 'Idea',
//   tasks: [{ taskName: 'first task' }, { taskName: 'not first task' }],
// },
// {
//   columnName: 'Todo',
//   tasks: [{ taskName: 'my task' }, { taskName: 'not my task' }],
// },
// {
//   columnName: 'In Progress',
//   tasks: [{ taskName: 'first task' }, { taskName: 'second task' }],
// },
// { columnName: 'Done', tasks: [{ taskName: 'not first task' }] },