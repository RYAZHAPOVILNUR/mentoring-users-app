import { createFeature, createReducer, on } from '@ngrx/store';
import { ArticlesActions } from './articles.actions';
import { LoadingStatus } from '@users/core/data-access';
import { Article } from '../models/article.model';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export const articlesFeatureKey = 'articles';

export interface ArticlesState extends EntityState<Article> {
  status: LoadingStatus
}

export const articlesAdapter: EntityAdapter<Article> =
  createEntityAdapter<Article>();

export const initialArticlesState: ArticlesState = articlesAdapter.getInitialState({
  status: 'init'
})

export const articlesFeature = createFeature({
  name: 'articles',
  reducer: createReducer(
    initialArticlesState,

    on(ArticlesActions.loadArticles, (state) => ({
      ...state,
      status: 'loading' as const
    })),

    on(ArticlesActions.loadArticlesSuccess, (state, { articles }) =>
      articlesAdapter.setAll(articles, { ...state, status: 'loaded' as const })
    ),
    on(ArticlesActions.editArticleSuccess, (state, {articles}) => articlesAdapter.updateOne({
      id: articles.id,
      changes: articles
    }, state)
    ),
    on(ArticlesActions.loadArticlesFailed, (state) => ({
      ...state,
      status: 'error' as const
    })),

    on(ArticlesActions.getArticleForEdit, (state) => ({
      ...state,
      status: 'loading' as const
    })),

    on(ArticlesActions.getArticleForEditSuccess, (state, { article }) =>
      articlesAdapter.addOne({ ...article }, { ...state, status: 'loaded' as const })
      ),

      on(ArticlesActions.getArticleForRead, (state)=>({
        ...state, status: 'loading' as const
      }) ),

      on(ArticlesActions.getArticleForReadSuccess, (state, {article})=>
      articlesAdapter.addOne({ ...article }, { ...state, status: 'loaded' as const })
      )

  )
});

