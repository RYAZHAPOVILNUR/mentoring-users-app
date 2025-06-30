import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tap } from 'rxjs';

import { IColumn, TasksFacade } from '@users/users/task/data-access';

import { filterColumnsByTerm } from './filter-columns-by-term.util';

type TaskColumnsState = {
  columns: IColumn[];
  filteredColumns: IColumn[];
};

const initialState: TaskColumnsState = {
  columns: [],
  filteredColumns: [],
};

@Injectable()
export class TasksStore extends ComponentStore<TaskColumnsState> {
  private readonly taskFacade = inject(TasksFacade);
  public columns$ = this.select(({ columns }) => columns);
  public filteredColumn$ = this.select(({ filteredColumns }) => filteredColumns);

  public changeColumnName = this.updater(
    (state, { columnIndex, columnName }: { columnIndex: number; columnName: string }) => {
      const updatedColumns = [...state.columns];
      const column = { ...updatedColumns[columnIndex], columnName };
      updatedColumns[columnIndex] = column;
      this.taskFacade.updateColumns(updatedColumns);
      return { ...state, columns: updatedColumns };
    },
  );
  public updateLocalColumns = this.updater((state, columns: IColumn[]) => {
    this.taskFacade.updateColumns(columns);
    return { ...state, columns };
  });
  public deleteLocalColumn = this.updater((state, columnIndex: number) => {
    const updatedColumns = [...state.columns];
    updatedColumns.splice(columnIndex, 1);
    this.taskFacade.updateColumns(updatedColumns);
    return { ...state, columns: updatedColumns };
  });
  public addTaskToLocalColumn = this.updater(
    (state, { columnIndex, taskName }: { columnIndex: number; taskName: string }) => {
      const updatedColumns = [...state.columns];
      const column = { ...updatedColumns[columnIndex] };
      column.tasks = [...column.tasks, { taskName }];
      updatedColumns[columnIndex] = column;
      this.taskFacade.updateColumns(updatedColumns);
      return { ...state, columns: updatedColumns };
    },
  );
  public deleteTask = this.updater((state, { columnIndex, taskName }: { columnIndex: number; taskName: string }) => {
    const updatedColumns = [...state.columns];
    const column = { ...updatedColumns[columnIndex] };
    column.tasks = column.tasks.filter((task) => task.taskName !== taskName);
    updatedColumns[columnIndex] = column;
    this.taskFacade.updateColumns(updatedColumns);
    return { ...state, columns: updatedColumns };
  });
  public searchTask = this.updater((state, term: string) => {
    this.taskFacade.searchTask(term);
    if (!term) {
      return { ...state, columns: [...state.columns], filteredColumns: [] };
    }
    state.filteredColumns = [...state.columns];
    const list = [...state.filteredColumns];
    const filteredColumns = filterColumnsByTerm(list, term);
    return {
      ...state,
      columns: [...state.columns],
      filteredColumns: [...filteredColumns],
    };
  });
  constructor() {
    super(initialState);
    this.setColumnsFromGlobalToLocalStore();
  }

  public deleteColumn(columnIndex: number): void {
    this.taskFacade.deleteColumn(columnIndex);
  }
  private setColumnsFromGlobalToLocalStore(): void {
    this.taskFacade.getMyBoard();
    this.taskFacade.getAllBoards();
    this.effect(() => this.taskFacade.allTaskColumns$.pipe(tap((columns: IColumn[]) => this.patchColumns(columns))));
  }

  private patchColumns(columns: IColumn[]): void {
    this.patchState({ columns });
  }
}
