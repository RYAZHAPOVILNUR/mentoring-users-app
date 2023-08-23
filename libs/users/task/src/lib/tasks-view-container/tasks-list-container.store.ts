import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { ApiService } from '@users/core/http';
import { IColumn, ITask, ITaskBoard, tasksAction } from '@users/users/task/data-access';
import { tap } from 'rxjs';

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
    this.apiService.get<ITaskBoard>('/todos/me').pipe(
      tap((res) => this.getColumnSuccess(res))
    )
  );

  private readonly getColumnSuccess = this.updater((state, action: ITaskBoard) => ({
    ...state,
    columns: action.columns,
  }));

  public readonly addColumn = this.updater((state, columnName: string) => {
    const newColumn: Column = {
      columnName,
      tasks: [],
    };
    return {
      ...state,
      columns: [...state.columns, newColumn],
    };
  });

  public readonly removeColumn = this.updater((state, columnIndex: number) => {
    const updatedColumns = state.columns.filter((_, index) => index !== columnIndex);
    return {
      ...state,
      columns: updatedColumns,
    };
  });

  public readonly addTask = this.updater((state, args: { columnIndex: number; taskName: string }) => {
    const updatedColumns = [...state.columns];
    updatedColumns[args.columnIndex].tasks.push({ taskName: args.taskName });
    return {
      ...state,
      columns: updatedColumns,
    };
  });
  
  public readonly removeTask = this.updater((state, args: { columnIndex: number; taskIndex: number }) => {
    const updatedColumns = [...state.columns];
    updatedColumns[args.columnIndex].tasks.splice(args.taskIndex, 1);
    return {
      ...state,
      columns: updatedColumns,
    };
  });
  
}
