import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { IColumn, TasksFacade } from '@users/users/task/data-access';
import { tap } from 'rxjs';

type TaskColumnsState = {
  columns: IColumn[];
};

const initialState: TaskColumnsState = {
  columns: [],
};

@Injectable()
export class TasksStore extends ComponentStore<TaskColumnsState> {
  private readonly taskFacade = inject(TasksFacade);
  public columns$ = this.select(({ columns }) => columns);

  constructor() {
    super(initialState);
    this.setColumnsFromGlobalToLocalStore();
  }

  private setColumnsFromGlobalToLocalStore(): void {
    this.taskFacade.getMyBoard();
    this.taskFacade.getAllBoards();
    this.effect(() =>
      this.taskFacade.allTaskColumns$.pipe(
        tap((columns: IColumn[]) => {
          this.patchColumns(columns);
        })
      )
    );
  }

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
}
