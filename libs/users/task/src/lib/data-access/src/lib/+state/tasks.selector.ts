import { createSelector, createFeatureSelector } from "@ngrx/store";
import { ITaskBoard } from "../model/task.interface";
import { TASKS_FEATURE_KEY } from "./tasks.reducer";

export const selectTaskState = createFeatureSelector<ITaskBoard>(TASKS_FEATURE_KEY);

export const selectColumn = createSelector(
  selectTaskState,
  (state: ITaskBoard) => state.columns
);

