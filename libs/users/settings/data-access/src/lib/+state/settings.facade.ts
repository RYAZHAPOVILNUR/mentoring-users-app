import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsActions } from './settings.actions';
import { selectArticlesViewStyleType } from './settings.selectors';

@Injectable({
  providedIn: 'root',
})
export class SettingsFacade {
  private readonly store = inject(Store);
  public readonly articlesViewStyleType$ = this.store.select(selectArticlesViewStyleType);

  getSettings() {
    this.store.dispatch(SettingsActions.loadSettings());
  }

  setArticlesStyleType(articlesViewStyleType: string) {
    this.store.dispatch(SettingsActions.setArticlesStyleType({ articlesViewStyleType }));
  }
}
