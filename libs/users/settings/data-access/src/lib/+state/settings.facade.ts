import { Store } from '@ngrx/store';
import { Injectable, inject } from '@angular/core';
import { selectArticlesViewStyleType } from './settings.selectors';
import { SettingsActions } from './settings.actions';
@Injectable({
  providedIn: 'root',
})
export class SettingsFacade {
  private readonly store = inject(Store);
  public readonly articlesViewStyleType$ = this.store.select(
    selectArticlesViewStyleType
  );

  getSettings() {
    this.store.dispatch(SettingsActions.loadSettings());
  }

  setArticlesStyleType(articlesViewStyleType: string) {
    this.store.dispatch(
      SettingsActions.setArticlesStyleType({ articlesViewStyleType })
    );
  }
}
