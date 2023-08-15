import { createSelector, createFeatureSelector } from "@ngrx/store";
import { TASKS_FEATURE_KEY } from "./tasks.reducer";
import { ITaskBoard } from "../model/tasks.interface";

export const selectTaskState = createFeatureSelector<ITaskBoard>(TASKS_FEATURE_KEY);

export const selectColumn = createSelector(
  selectTaskState,
  (state: ITaskBoard) => state.columns
);