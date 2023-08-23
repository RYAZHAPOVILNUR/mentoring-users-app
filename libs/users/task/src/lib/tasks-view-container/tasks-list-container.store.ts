import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from '@users/core/http';
import {
  IColumn,
  ITask,
  ITaskBoard,
  tasksAction,
} from '@users/users/task/data-access';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';

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
  public columns$ = this.select(({ columns }) => columns);
  public readonly vm$ = this.select({
    isLoading: this.isLoading$,
    columns: this.columns$,
  });

  constructor() {
    super(initialState);
    this.loadColumns();
  }

  private readonly loadColumns = this.effect(() =>
    this.apiService
      .get<ITaskBoard>('/todos/me')
      .pipe(tap((res) => this.getColumnSuccess(res))).pipe(tap((res) => {
        console.log('API Response:', res);
        this.getColumnSuccess(res);
      }))
      
  );

  private readonly getColumnSuccess = this.updater(
    (state, action: ITaskBoard) => ({
      ...state,
      columns: action.columns,
    })
  );

  public readonly addColumn = this.effect((columnName$: Observable<string>) =>
  columnName$.pipe(
    switchMap((columnName) => {
      const newColumn: Column = { columnName, tasks: [] };
      return this.apiService
        .post<void, { columns: Column[] }>('/todos/change', {
          columns: [newColumn],
        })
        .pipe(
          tap(() => this.addColumnSuccess(columnName)),
          catchError((error) => of(this.updateStateError(error)))
        );
    })
  )
);


private readonly addColumnSuccess = this.updater(
  (state, columnName: string) => {
    console.log("Before:", state.columns);
    const newColumns = [...state.columns, { columnName, tasks: [] }];
    console.log("After:", newColumns);
    return {
      ...state,
      columns: newColumns,
    };
  }
);


  public readonly removeColumn = this.effect((columnIndex$: Observable<number>) =>
  columnIndex$.pipe(
    switchMap((columnIndex) => 
    this.apiService.delete<void>(`/todos/${columnIndex}`).pipe(
        tap(() => this.removeColumnSuccess(columnIndex)),
         
        catchError((error) => of(this.updateStateError(error)))
      )
    )
  )
);

private readonly removeColumnSuccess = this.updater((state, columnIndex: number) => ({
  ...state,
  columns: state.columns.filter((_, index) => index !== columnIndex),
}));

public readonly addTask = this.effect((payload$: Observable<{ columnIndex: number; task: ITask }>) =>
  payload$.pipe(
    switchMap(({ columnIndex, task }) => 
      this.apiService.post<void, { task: ITask }>('/todos/addTask', { task }).pipe(
        tap(() => this.addTaskSuccess({ columnIndex, task })),
        catchError((error) => of(this.updateStateError(error)))
      )
    )

  )
);

private readonly addTaskSuccess = this.updater((state, { columnIndex, task }: { columnIndex: number; task: ITask }) => {
  const updatedColumns = [...state.columns];
  updatedColumns[columnIndex].tasks.push(task);
  return {
    ...state,
    columns: updatedColumns,
  };
});



  private readonly updateStateError = this.updater((state, error: Error) => ({
    ...state,

  }));

  
}
