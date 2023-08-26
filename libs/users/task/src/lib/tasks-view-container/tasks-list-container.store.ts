import { Injectable, inject } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { IColumn, TasksFacade } from "@users/users/task/data-access";
import { tap } from "rxjs";

type TaskColumnsState = {
  columns: IColumn[];
};

const initialState: TaskColumnsState = {
  columns: [],
};

@Injectable()
export class TasksStore extends ComponentStore<TaskColumnsState> {
  private readonly taskFacade = inject(TasksFacade)
  public columns$ = this.select(({ columns }) => columns);

  constructor() {
    super(initialState);
    this.setColumnsFromGlobalToLocalStore();
  }

  private setColumnsFromGlobalToLocalStore(): void {
    this.effect(() =>
      this.taskFacade.allTaskColumns$.pipe(
        tap((columns: IColumn[]) => this.patchColumns(columns))
      )
    );
    this.taskFacade.loadTasksData();
  }

  private patchColumns(columns: IColumn[]): void {
    this.patchState({
      columns,
    });
  }

  public deleteColumn(columnIndex: number): void {
    this.taskFacade.deleteColumn(columnIndex);
  }

  public addColumn(columns: IColumn[], ): void {
    this.taskFacade.addColumn(columns);
  
  }
 
}
