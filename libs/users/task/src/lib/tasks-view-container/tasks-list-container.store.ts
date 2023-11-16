import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {IColumn, ITask, TasksFacade} from '@users/users/task/data-access';
import { tap} from 'rxjs';

type TaskColumnsState = {
  columns: IColumn[];
  filteredColumns: IColumn[];
};

const initialState: TaskColumnsState = {
  columns: [],
  filteredColumns: []
};

export function filterColumnsByTerm(columns: IColumn[], term: string): IColumn[] {
  return columns.map((column) => {
    const filteredTasks = filterTasksByTerm(column.tasks, term);
    return { ...column, tasks: filteredTasks };
  });
}

function filterTasksByTerm(tasks: ITask[], term: string): ITask[] {
  return tasks.filter((task) => task.taskName.includes(term));
}

@Injectable()
export class TasksStore extends ComponentStore<TaskColumnsState> {
  private readonly taskFacade = inject(TasksFacade);
  public columns$ = this.select(({ columns }) => columns);
  public filteredColumn$ = this.select(({filteredColumns}) => filteredColumns);

  constructor() {
    super(initialState);
    this.setColumnsFromGlobalToLocalStore();
  }

  private setColumnsFromGlobalToLocalStore(): void {
    this.taskFacade.getMyBoard();
    this.taskFacade.getAllBoards();
    this.effect(() =>
      this.taskFacade.allTaskColumns$.pipe(
          tap((columns: IColumn[]) => this.patchColumns(columns))
        )
    );
  }

  public changeColumnName = this.updater((state, { columnIndex, columnName }: { columnIndex: number, columnName: string }) => {
    const updatedColumns = [...state.columns];
    const column = { ...updatedColumns[columnIndex], columnName };
    updatedColumns[columnIndex] = column;
    this.taskFacade.updateColumns(updatedColumns);
    return { ...state, columns: updatedColumns };
  });

  private patchColumns(columns: IColumn[]): void {
    this.patchState({ columns });
  }

  public deleteColumn(columnIndex: number): void {
    this.taskFacade.deleteColumn(columnIndex);
  }

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

  public addTaskToLocalColumn = this.updater((state, { columnIndex, taskName }: { columnIndex: number, taskName: string }) => {
    const updatedColumns = [...state.columns];
    const column = { ...updatedColumns[columnIndex] };
    column.tasks = [...column.tasks, { taskName }];
    updatedColumns[columnIndex] = column;
    this.taskFacade.updateColumns(updatedColumns);
    return { ...state, columns: updatedColumns };
  });

  public deleteTask = this.updater((state, { columnIndex, taskName }: { columnIndex: number, taskName: string }) => {
    const updatedColumns = [...state.columns];
    const column = { ...updatedColumns[columnIndex] };
    column.tasks = column.tasks.filter(task => task.taskName !== taskName);
    updatedColumns[columnIndex] = column;
    this.taskFacade.updateColumns(updatedColumns);
    return { ...state, columns: updatedColumns };
  });

  public searchTask = this.updater((state, term: string) => {
    this.taskFacade.searchTask(term);
    if (!term) {
      return {...state, columns: [...state.columns], filteredColumns: []};
    }
    state.filteredColumns = [...state.columns];
    const list = [...state.filteredColumns];
    const filteredColumns = filterColumnsByTerm(list, term);
    return {...state, columns: [...state.columns], filteredColumns: [...filteredColumns] };
  })
}
