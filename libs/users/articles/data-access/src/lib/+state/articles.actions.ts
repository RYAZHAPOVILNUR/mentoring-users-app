import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CreateArticle } from "../models/create-article.model";
import { Article } from "../models/article.model";

export const ArticlesActions = createActionGroup({
  source: 'Article',
  events: {
    publishArticle: props<{ article: CreateArticle }>(),
    publishArticleSuccess: emptyProps(),
    publishArticleFailed: props<{ error: Error }>(),
    loadArticles: emptyProps(),
    loadArticlesSuccess: props<{articles: Article[]}>(),
    loadArticlesFailed: props<{ error: Error }>(),
    getArticle: props<{id:number}>(),
    getArticleSuccess: props<{article: Article}>(),
    getArticlesFailed: props<{ error: Error }>(),
  },
});
