import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService, StorageKey } from '@shared/util-storage';
import { of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

import { SettingsActions } from './settings.actions';

@Injectable()
export class SettingsEffects {
  private readonly localStorageService = inject(LocalStorageService);

  loadSettings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsActions.loadSettings),
      switchMap(() => {
        const articleViewType = this.localStorageService.get<string>(StorageKey.ARTICLE_VIEW_TYPE);
        const defaultViewType = 'LIST';

        if (!articleViewType) {
          this.localStorageService.set(StorageKey.ARTICLE_VIEW_TYPE, defaultViewType);
        }

        return of(1).pipe(
          map(() =>
            SettingsActions.loadSettingsSuccess({
              settings: {
                articlesViewStyleType: articleViewType ?? defaultViewType,
              },
            }),
          ),
        );
      }),
    );
  });

  setArticlesStyleType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsActions.setArticlesStyleType),
      switchMap(({ articlesViewStyleType }) => {
        this.localStorageService.set(StorageKey.ARTICLE_VIEW_TYPE, articlesViewStyleType);

        return of(1).pipe(
          map(() =>
            SettingsActions.setArticlesStyleTypeSuccess({
              articlesViewStyleType,
            }),
          ),
        );
      }),
    );
  });

  constructor(private actions$: Actions) {}
}
