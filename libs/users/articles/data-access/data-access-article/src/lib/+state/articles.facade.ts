import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { articlesActions } from './articles.actions';
import * as articleSelectors from './articles.selectors';
import { CreateArticle } from '../interfaces/create-article.interface';

@Injectable({ providedIn: 'root' })
export class ArticlesFacade {
  private readonly store = inject(Store);
  public readonly articles$ = this.store.select(articleSelectors.selectAllArticles);
  public readonly status$ = this.store.select(articleSelectors.selectStatus);
  public readonly articleForEdit$ = this.store.select(articleSelectors.selectArticleForEdit);

  addArticle(article: CreateArticle) {
    this.store.dispatch(articlesActions.addArticle({ article }));
  }

  updateArticle(article: CreateArticle) {
    this.store.dispatch(articlesActions.updateArticle({ article }));
  }

  loadArticles() {
    this.store.dispatch(articlesActions.loadArticles());
  }
  loadArticle() {
    this.store.dispatch(articlesActions.loadArticle());
  }
}
