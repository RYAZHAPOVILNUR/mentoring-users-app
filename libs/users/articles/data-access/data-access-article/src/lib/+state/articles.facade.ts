import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Article } from '@users/shared/data-access-models';
import { Observable } from 'rxjs';

import { articlesActions } from './articles.actions';
import { selectArticles, selectArticlesEntities } from './articles.selectors';
import { CreateArticle } from '../interfaces/create-article.interface';

@Injectable({ providedIn: 'root' })
export class ArticlesFacade {
  private readonly store = inject(Store);
  public readonly articles$: Observable<Article[]> = this.store.select(selectArticles);
  public readonly articlesEntities$ = this.store.select(selectArticlesEntities);

  editArticle(articleData: CreateArticle, id: number) {
    this.store.dispatch(articlesActions.editArticle({ articleData, id }));
  }

  publishArticle(article: CreateArticle) {
    this.store.dispatch(articlesActions.publishArticle({ article }));
  }
}
