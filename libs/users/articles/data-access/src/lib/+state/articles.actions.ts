import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CreateArticle } from "../models/createArticle.model";

export const articlesActions = createActionGroup({
  source: 'Article',
  events: {
    publishArticle: props<{ article: CreateArticle }>(),
    publishArticleSuccess: emptyProps(),
    publishArticleFailed: props<{ error: Error }>(),
  },
});
