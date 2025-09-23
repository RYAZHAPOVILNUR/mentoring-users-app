import { inject, Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { ArticleVM } from '../types/article-vm.interface';

import { articlesActions } from './articles.actions';
import * as articleSelectors from './articles.selectors';

@Injectable({ providedIn: 'root' })
export class ArticlesFacade {
  private readonly store = inject(Store);
  public readonly articles$ = this.store.select(articleSelectors.selectAllArticles);
  public readonly status$ = this.store.select(articleSelectors.selectStatus);
  public readonly articleForEdit$ = this.store.select(
    articleSelectors.selectArticleForEdit,
  );

  public readonly openedArticle = this.store.select(articleSelectors.selectOpenedArticle);

  add(article: ArticleVM) {
    this.store.dispatch(articlesActions.addArticle({ article }));
  }

  update(article: ArticleVM) {
    this.store.dispatch(articlesActions.updateArticle({ article }));
  }

  getAll() {
    this.store.dispatch(articlesActions.getAll());
  }
  getOne() {
    this.store.dispatch(articlesActions.getOne());
  }
}
