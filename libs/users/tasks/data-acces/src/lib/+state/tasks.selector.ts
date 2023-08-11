import { createSelector, createFeatureSelector } from "@ngrx/store";
import { ITaskColum } from "../model/task.interface";

export const selectTaskState = (state: { tasks: { tasks: ITaskColum }}) => state.tasks.tasks;

export const selectColumn = createSelector(
  selectTaskState,
  (state: ITaskColum) => state.column
);

export const selectTasks = createSelector(
  selectTaskState,
  (state) => state.column.tasks
)
export const selectTaskName = createSelector(
  selectTaskState,
  (state) => state.column.columnName
)