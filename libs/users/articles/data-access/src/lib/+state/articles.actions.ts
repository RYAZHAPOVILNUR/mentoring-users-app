import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CreateArticle } from "../models/create-article.model";
import { Article } from "../models/article.model";

export const ArticlesActions = createActionGroup({
  source: 'Article',
  events: {
    publishArticle: props<{ article: CreateArticle }>(),
    publishArticleSuccess: emptyProps(),
    publishArticleFailed: props<{ error: Error }>(),

    editArticle: props<{ articleData: CreateArticle, id: number }>(),
    editArticleSuccess: props<{articles: Article}>(),
    editArticleFailed: props<{ error: Error }>(),

    loadArticles: emptyProps(),
    loadArticlesSuccess: props<{articles: Article[]}>(),
    loadArticlesFailed: props<{ error: Error }>(),

    getArticleForEdit: props<{id:string}>(),
    getArticleForEditSuccess: props<{article: Article}>(),
    getArticleForEditFailed: props<{ error: Error }>(),

    getArticleForRead: emptyProps(),
    getArticleForReadSuccess: props<{article: Article}>(),
    getArticleForReadFailed: props<{error: Error}>(),

    deleteColumn: props<{ columnIndex: number }>(),
  },
});
