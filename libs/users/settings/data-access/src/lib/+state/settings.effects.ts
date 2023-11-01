import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import {of, switchMap } from 'rxjs';
import { SettingsActions } from './settings.actions';

@Injectable()
export class SettingsEffects {
  loadSettings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsActions.loadSettings),
      switchMap(() => {
        const articleViewType = localStorage.getItem('articleViewType') ?? (localStorage.setItem('articleViewType', 'LIST'), 'LIST');
        return of(1).pipe(
          map((e) =>
            SettingsActions.loadSettingsSuccess({
              settings: {
                articlesViewStyleType: articleViewType,
              },
            })
          )
        );
      })
    );
  });


  setArticlesStyleType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsActions.setArticlesStyleType),
      switchMap(({articlesViewStyleType}) => {
        localStorage.setItem('articleViewType', articlesViewStyleType)
        return of(1).pipe(
          map((e) =>
            SettingsActions.setArticlesStyleTypeSuccess({articlesViewStyleType})
          )
        );
      })
    );
  });





  constructor(private actions$: Actions) {}
}
