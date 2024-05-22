import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MaterialModel } from '@users/settings/data-access';

const getMaterialState = createFeatureSelector<MaterialModel>('Materials')

export const getMaterialList = createSelector(getMaterialState, (state) => {
  if (state.list) {
    return state.list.slice().sort((a, b) => {
      if (a.id && b.id) {
        return b.id - a.id;
      }
      return 0;
    });
  }
  return [];
})

export const getMaterial = createSelector(getMaterialState, (state) => { return state.material })

