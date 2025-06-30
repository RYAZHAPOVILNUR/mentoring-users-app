import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ArticlesActions } from './articles.actions';
import { selectArticles, selectArticlesEntities } from './articles.selectors';
import { Article } from '../models/article.model';
import { CreateArticle } from '../models/create-article.model';

@Injectable({ providedIn: 'root' })
export class ArticlesFacade {
  private readonly store = inject(Store);
  public readonly articles$: Observable<Article[]> = this.store.select(selectArticles);
  public readonly articlesEntities$ = this.store.select(selectArticlesEntities);

  editArticle(articleData: CreateArticle, id: number) {
    this.store.dispatch(ArticlesActions.editArticle({ articleData, id }));
  }

  publishArticle(article: CreateArticle) {
    this.store.dispatch(ArticlesActions.publishArticle({ article }));
  }
}
